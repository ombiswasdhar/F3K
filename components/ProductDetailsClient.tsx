"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Heart, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Plus, 
  Minus, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronDown, 
  X, 
  Maximize2,
  Share2,
  ArrowLeft,
  ArrowDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";
import { PDPProduct } from "@/app/products/[slug]/page";

// Pre-computed dominant colors for all Drop 001 tees to render authentic studio tints instantly
const TEE_COLOR_MAP: Record<string, { r: number; g: number; b: number; name: string }> = {
  "f3k_tee_2": { r: 70, g: 68, b: 68, name: "Charcoal Black" },
  "f3k_tee_3": { r: 145, g: 15, b: 15, name: "Crimson Red" },
  "f3k_tee_4": { r: 106, g: 102, b: 99, name: "Vintage Carbon" },
  "f3k_tee_5": { r: 95, g: 93, b: 91, name: "Smoke Gray" },
  "f3k_tee_6": { r: 99, g: 87, b: 70, name: "Olive Khaki" },
  "f3k_tee_7": { r: 103, g: 100, b: 99, name: "Asphalt Gray" },
  "f3k_tee_8": { r: 138, g: 124, b: 115, name: "Warm Sand" },
  "f3k_tee_9": { r: 105, g: 125, b: 100, name: "Sage Green" },
  "f3k_tee_10": { r: 104, g: 100, b: 98, name: "Washed Mineral" },
  "f3k_tee_11": { r: 94, g: 92, b: 89, name: "Cement" },
  "f3k_tee_12": { r: 132, g: 72, b: 64, name: "Terracotta" },
  "f3k_tee_13": { r: 159, g: 145, b: 134, name: "Oatmeal Beige" },
  "f3k_tee_14": { r: 91, g: 91, b: 92, name: "Steel Gray" },
  "f3k_tee_15": { r: 52, g: 64, b: 84, name: "Indigo Slate" },
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace("#", "");
  const num = parseInt(cleanHex, 16);
  if (cleanHex.length === 3) {
    return {
      r: ((num >> 8) & 0xf) * 17,
      g: ((num >> 4) & 0xf) * 17,
      b: (num & 0xf) * 17,
    };
  }
  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff,
  };
}

function getStudioTint(rgb: { r: number; g: number; b: number }) {
  const { r, g, b } = rgb;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const isNeutral = (max - min) < 20;

  // Mix ratio: 16% color for chromatic shirts (e.g. Red, Green, Blue, Terracotta) for a clear, vivid studio tint; 7% for neutrals
  const mix1 = isNeutral ? 0.07 : 0.16;
  const mix2 = isNeutral ? 0.03 : 0.08;

  const bgR1 = Math.round(255 * (1 - mix1) + r * mix1);
  const bgG1 = Math.round(255 * (1 - mix1) + g * mix1);
  const bgB1 = Math.round(255 * (1 - mix1) + b * mix1);

  const bgR2 = Math.round(255 * (1 - mix2) + r * mix2);
  const bgG2 = Math.round(255 * (1 - mix2) + g * mix2);
  const bgB2 = Math.round(255 * (1 - mix2) + b * mix2);

  const borderR = Math.round(210 * 0.82 + r * 0.18);
  const borderG = Math.round(210 * 0.82 + g * 0.18);
  const borderB = Math.round(210 * 0.82 + b * 0.18);

  return {
    background: `linear-gradient(145deg, rgb(${bgR1}, ${bgG1}, ${bgB1}) 0%, rgb(${bgR2}, ${bgG2}, ${bgB2}) 100%)`,
    borderColor: `rgb(${borderR}, ${borderG}, ${borderB})`,
    dividerColor: `rgba(${borderR}, ${borderG}, ${borderB}, 0.65)`,
    hex: `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`,
  };
}

interface ProductDetailsClientProps {
  product: PDPProduct;
  relatedProducts: PDPProduct[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const router = useRouter();
  const purchaseSectionRef = useRef<HTMLDivElement>(null);
  const { addItem, setIsOpen: setCartOpen, items } = useCartStore();
  const { toggleItem, hasItem } = useWishlistStore();

  // Gallery and State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Pitch Black");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");

  const isFavorited = hasItem(product.id);
  const allImages = product.images.length > 0 ? product.images : [product.thumbnail];
  const activeImage = allImages[activeImageIndex] || product.thumbnail;

  // Studio Tint State: Manual selection or automatic image color detection
  const [manualColorRgb, setManualColorRgb] = useState<{ r: number; g: number; b: number } | null>(null);

  // Initial color detection from active image
  const [detectedRgb, setDetectedRgb] = useState<{ r: number; g: number; b: number }>(() => {
    const targetImg = product.images[0] || product.thumbnail || "";
    const match = targetImg.match(/f3k_tee_(\d+)/);
    const key = match ? `f3k_tee_${match[1]}` : null;
    if (key && TEE_COLOR_MAP[key]) {
      return { r: TEE_COLOR_MAP[key].r, g: TEE_COLOR_MAP[key].g, b: TEE_COLOR_MAP[key].b };
    }
    return { r: 50, g: 50, b: 50 };
  });

  // Automatically detect the t-shirt's main color from image pixels via offscreen canvas
  React.useEffect(() => {
    if (typeof window === "undefined" || !activeImage) return;

    // Check fast map first
    const match = activeImage.match(/f3k_tee_(\d+)/);
    const key = match ? `f3k_tee_${match[1]}` : null;
    if (key && TEE_COLOR_MAP[key]) {
      setDetectedRgb({ r: TEE_COLOR_MAP[key].r, g: TEE_COLOR_MAP[key].g, b: TEE_COLOR_MAP[key].b });
    }

    // Dynamic offscreen canvas extraction for exact pixels
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = activeImage;

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        canvas.width = 40;
        canvas.height = 40;
        ctx.drawImage(img, 0, 0, 40, 40);
        const data = ctx.getImageData(0, 0, 40, 40).data;

        let totalWeight = 0;
        let wR = 0, wG = 0, wB = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (a > 70 && !(r > 245 && g > 245 && b > 245)) {
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const sat = max === 0 ? 0 : (max - min) / max;
            const weight = 1 + sat * 3;

            wR += r * weight;
            wG += g * weight;
            wB += b * weight;
            totalWeight += weight;
          }
        }

        if (totalWeight > 0) {
          setDetectedRgb({
            r: Math.round(wR / totalWeight),
            g: Math.round(wG / totalWeight),
            b: Math.round(wB / totalWeight),
          });
        }
      } catch {
        // Safe fallback
      }
    };
  }, [activeImage]);

  // Active studio tint: manual colorway if user clicked a dot, otherwise detected t-shirt color
  const activeTintRgb = manualColorRgb || detectedRgb;
  const studioTint = getStudioTint(activeTintRgb);

  const currentColorObj = product.colors[0];
  const currentColorHex = currentColorObj?.hex || "#202020";

  const totalCartCount = items.reduce((total, i) => total + i.quantity, 0);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const scrollToPurchase = () => {
    purchaseSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      product_id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      thumbnail: activeImage,
    }, quantity);

    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      product_id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      thumbnail: activeImage,
    }, quantity);

    router.push("/checkout");
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion((prev) => (prev === name ? null : name));
  };

  const discountPercent = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <div className="w-full">
      {/* ─────────────────────────────────────────────────────────────
          1. FULL-BLEED T-SHIRT DISPLAY BOX
          • Stretches 100% from left screen edge to right screen edge
          • No curved corners (rounded-none)
          • Top and bottom clean & unaffected
          • "← Back" on top left
          • Flanking semi-transparent arrows next to the t-shirt
          • Right rail with Like, Expand, Share, and Cart buttons
          • Integrated bottom row: "01 / 07" on left, Selected Colorway & Circular Dots on right
      ───────────────────────────────────────────────────────────── */}
      <section 
        className="relative w-full rounded-none border-y overflow-hidden min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex flex-col justify-between select-none transition-all duration-700 ease-out"
        style={{
          background: studioTint.background,
          borderColor: studioTint.borderColor,
        }}
      >

        {/* ─── TOP BAR INSIDE DISPLAY BOX ─── */}
        <div 
          className="relative z-20 flex items-center justify-between px-6 sm:px-10 lg:px-14 py-4 border-b transition-colors duration-700"
          style={{ borderColor: studioTint.dividerColor }}
        >
          {/* Left: "← Back" button + "DROP 01" in bold */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-neutral-800 hover:text-black transition group"
              title="Back to All T-Shirts"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span className="font-semibold">Back</span>
            </Link>

            <span className="text-neutral-400 font-sans">•</span>

            <span className="font-sans font-extrabold text-xs sm:text-sm tracking-wider uppercase text-neutral-900">
              DROP 01
            </span>
          </div>

          {/* Right: Minimal Pagination Dots */}
          <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-300/70 shadow-xs">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                aria-label={`View photo ${idx + 1}`}
                className={`transition-all rounded-full ${
                  activeImageIndex === idx
                    ? "size-2 bg-black"
                    : "size-1.5 bg-neutral-400 hover:bg-neutral-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ─── MAIN DISPLAY STAGE (FLANKED BY SHARP ARROWS) ─── */}
        <div className="relative flex-1 w-full grid grid-cols-1 lg:grid-cols-12 items-center px-6 sm:px-10 lg:px-14 py-4">
          
          {/* LEFT COLUMN: Clean Title, Category & Scroll Link */}
          <div className="relative z-10 py-4 lg:col-span-4 flex flex-col justify-center">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-neutral-500 block mb-1.5">
              {product.category}
            </span>

            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-neutral-900 leading-[0.95]">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="font-bold text-2xl text-neutral-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.compare_price && (
                <span className="text-xs text-neutral-400 line-through">
                  ₹{product.compare_price.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <p className="mt-2.5 text-xs text-neutral-600 max-w-xs leading-relaxed line-clamp-2 font-sans">
              {product.short_description}
            </p>

            <div className="mt-4">
              <button
                type="button"
                onClick={scrollToPurchase}
                className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 underline underline-offset-4 hover:text-black transition"
              >
                <span>Select Size & Buy</span>
                <ArrowDown size={12} className="transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* CENTER: Floating T-Shirt Cutout (CLEAN, NO BLUR BEHIND SHIRT) */}
          <div className="relative lg:col-span-7 h-[360px] sm:h-[440px] lg:h-[500px] w-full flex items-center justify-center">

            {/* Left Sharp Arrow next to T-Shirt (NO CIRCLE) */}
            {allImages.length > 1 && (
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous view angle"
                className="absolute left-2 sm:left-6 z-20 p-2 text-neutral-800 hover:text-black hover:scale-120 transition-transform cursor-pointer"
                title="Previous image"
              >
                <ChevronLeft size={30} strokeWidth={2} />
              </button>
            )}

            {/* Central Floating T-Shirt Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${product.id}-${activeImage}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center cursor-pointer"
                onClick={nextImage}
                title="Click to cycle next angle"
              >
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-contain p-2 sm:p-6 select-none drop-shadow-md transition-transform duration-500 hover:scale-104"
                />
              </motion.div>
            </AnimatePresence>

            {/* Right Sharp Arrow next to T-Shirt (NO CIRCLE) */}
            {allImages.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next view angle"
                className="absolute right-2 sm:right-6 z-20 p-2 text-neutral-800 hover:text-black hover:scale-120 transition-transform cursor-pointer"
                title="Next image"
              >
                <ChevronRight size={30} strokeWidth={2} />
              </button>
            )}
          </div>

          {/* RIGHT RAIL: Like, Expand, Share, and Cart Buttons */}
          <div 
            className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center gap-3.5 h-full py-6 border-l pl-4 transition-colors duration-700"
            style={{ borderColor: studioTint.dividerColor }}
          >
            
            {/* 1. Like / Wishlist */}
            <button
              type="button"
              onClick={() => toggleItem({
                id: product.id,
                product_id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                thumbnail: activeImage,
                gender: product.gender
              })}
              aria-label="Save to Wishlist"
              className={`size-9 rounded-full border grid place-items-center transition shadow-xs ${
                isFavorited
                  ? "bg-black text-white border-black"
                  : "bg-white/80 text-neutral-700 border-neutral-300 hover:bg-white hover:text-black"
              }`}
            >
              <Heart size={15} className={isFavorited ? "fill-white" : ""} />
            </button>

            {/* 2. Expand / Fullscreen */}
            <button
              type="button"
              onClick={() => setShowFullscreen(true)}
              aria-label="View Fullscreen"
              className="size-9 rounded-full bg-white/80 text-neutral-700 border border-neutral-300 grid place-items-center hover:bg-white hover:text-black transition shadow-xs"
            >
              <Maximize2 size={14} />
            </button>

            {/* 3. Share */}
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share product"
              className="size-9 rounded-full bg-white/80 text-neutral-700 border border-neutral-300 grid place-items-center hover:bg-white hover:text-black transition shadow-xs relative"
            >
              <Share2 size={14} />
              {copiedLink && (
                <span className="absolute right-10 whitespace-nowrap bg-black text-white text-[10px] px-2 py-0.5 rounded shadow">
                  Copied
                </span>
              )}
            </button>

            {/* 4. Cart Button with Live Badge */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Open Shopping Bag"
              className="relative size-9 rounded-full bg-white/80 text-neutral-700 border border-neutral-300 grid place-items-center hover:bg-white hover:text-black transition shadow-xs cursor-pointer"
            >
              <ShoppingBag size={14} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-black text-[8px] font-bold text-white">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ─── INTEGRATED BOTTOM ROW: "01/05" ON LEFT, COLORWAY ON RIGHT ─── */}
        <div 
          className="relative z-20 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 lg:px-14 py-3.5 border-t bg-transparent gap-3 transition-colors duration-700"
          style={{ borderColor: studioTint.dividerColor }}
        >
          
          {/* LEFT: "01 OF 05" Index Text */}
          <div className="flex items-baseline gap-1.5 self-start sm:self-auto">
            <span className="font-archivo text-2xl sm:text-3xl font-extrabold text-neutral-900 block leading-none">
              {product.indexNumber}
            </span>
            <span className="text-xs font-sans uppercase tracking-wider text-neutral-500 font-bold">
              OF 05
            </span>
          </div>

          {/* RIGHT: Garment Colorway */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-sans text-neutral-700">
            <span className="text-neutral-500 font-sans text-[11px] uppercase tracking-wider">Colorway:</span>
            <span className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-wider">
              {selectedColor}
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. PURCHASING & DETAIL SECTION (NORMAL MINIMAL CLOTHING STORE)
      ───────────────────────────────────────────────────────────── */}
      <div 
        ref={purchaseSectionRef} 
        id="purchase" 
        className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12 mt-12 space-y-16"
      >
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-neutral-300 p-6 sm:p-10 lg:p-12 shadow-xs font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* LEFT: Multi-Angle Visual Inspection Grid */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-sans uppercase tracking-widest text-neutral-500">
                  Garment Angles &amp; Details
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-900 mt-1 font-archivo">
                  Visual Inspection
                </h3>
              </div>

              {/* 4-angle clean grid */}
              <div className="grid grid-cols-2 gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[4/5] rounded-xl border p-2 flex items-center justify-center transition overflow-hidden ${
                      activeImageIndex === idx
                        ? "border-black ring-1 ring-black bg-[#eff1ee]/40"
                        : "border-neutral-200 bg-neutral-50 hover:border-neutral-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-2"
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] font-sans text-neutral-500 bg-white/90 px-1.5 py-0.5 rounded shadow-xs">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>

              {/* Fabric Specs Summary */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-none bg-[#f2f2f0]/60 border border-neutral-300 text-center text-xs font-sans">
                <div>
                  <span className="text-neutral-500 text-[10px] block uppercase font-sans tracking-wider">Weight</span>
                  <strong className="text-neutral-900 font-semibold">{product.fabric}</strong>
                </div>
                <div className="border-x border-neutral-300">
                  <span className="text-neutral-500 text-[10px] block uppercase font-sans tracking-wider">Composition</span>
                  <strong className="text-neutral-900 font-semibold">{product.composition}</strong>
                </div>
                <div>
                  <span className="text-neutral-500 text-[10px] block uppercase font-sans tracking-wider">Silhouette</span>
                  <strong className="text-neutral-900 font-semibold">{product.fit}</strong>
                </div>
              </div>
            </div>

            {/* RIGHT: Purchasing Form, Size Selector, CTA & Accordions */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                
                {/* Product Header */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans uppercase tracking-widest text-neutral-500">
                      {product.category} • {product.gender}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-archivo font-extrabold uppercase tracking-[-0.02em] text-[#0a0a0a]">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="text-3xl font-bold text-[#0a0a0a] font-sans">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.compare_price && (
                      <>
                        <span className="text-base text-neutral-400 line-through font-sans">
                          ₹{product.compare_price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs font-archivo font-bold uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-none">
                          {discountPercent}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2 pt-1 text-xs font-medium text-emerald-700">
                    <span className="size-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span>In Stock — Dispatches within 24 hours</span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 pt-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="h-px bg-neutral-200" />

                {/* Garment Color Specification */}
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-neutral-500 font-sans">Color:</span>
                  <span className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-wide">
                    {selectedColor}
                  </span>
                </div>

                {/* Size Selection */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-700 font-medium">Select Size</span>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(true)}
                      className="text-neutral-600 underline underline-offset-4 hover:text-black transition text-xs font-medium"
                    >
                      Size &amp; Fit Guide
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((s) => {
                      const isSelected = selectedSize === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`py-3 text-center text-xs font-archivo font-bold rounded-none border transition cursor-pointer ${
                            isSelected
                              ? "bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-xs"
                              : "bg-white text-neutral-800 border-neutral-300 hover:border-black hover:bg-neutral-50"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-archivo font-bold uppercase tracking-wider text-neutral-700">Quantity</span>
                  <div className="flex items-center border border-neutral-300 rounded-none w-32 h-11 px-2 bg-white">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="size-7 grid place-items-center text-neutral-500 hover:text-black disabled:opacity-30 transition cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="flex-1 text-center text-xs font-bold text-neutral-900 font-archivo">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="size-7 grid place-items-center text-neutral-500 hover:text-black transition cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="space-y-3 pt-3">
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="flex-1 py-4 px-6 rounded-none bg-[#0a0a0a] text-white text-xs font-archivo font-bold uppercase tracking-[0.1em] hover:bg-[#1f1f1f] transition flex items-center justify-center gap-2 active:scale-[0.99] shadow-xs cursor-pointer"
                    >
                      {addedFeedback ? (
                        <>
                          <Check size={16} />
                          Added To Bag
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={16} />
                          Add To Bag • ₹{(product.price * quantity).toLocaleString("en-IN")}
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleItem({
                        id: product.id,
                        product_id: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        thumbnail: activeImage,
                        gender: product.gender
                      })}
                      aria-label="Save to wishlist"
                      className={`size-14 rounded-full border grid place-items-center transition shrink-0 ${
                        isFavorited
                          ? "border-black bg-black text-white"
                          : "border-neutral-300 text-neutral-700 hover:text-black hover:border-black bg-white"
                      }`}
                    >
                      <Heart size={20} className={isFavorited ? "fill-white" : ""} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-6 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white hover:border-black transition text-center"
                  >
                    Buy It Now
                  </button>
                </div>

                {/* Trust Guarantees */}
                <div className="grid grid-cols-3 gap-2 border-y border-neutral-200 py-4 text-center text-[11px] text-neutral-600">
                  <div className="flex flex-col items-center gap-1">
                    <Truck size={16} className="text-neutral-500" />
                    <span>Free Express Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-x border-neutral-200">
                    <RotateCcw size={16} className="text-neutral-500" />
                    <span>14-Day Free Returns</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck size={16} className="text-neutral-500" />
                    <span>100% Combed Cotton</span>
                  </div>
                </div>

                {/* Accordions */}
                <div className="space-y-2 pt-2">
                  <div className="border border-neutral-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("details")}
                      className="w-full p-4 flex items-center justify-between text-left text-xs font-bold uppercase text-neutral-900 hover:bg-neutral-50 transition"
                    >
                      <span>Product Silhouette &amp; Fit</span>
                      <ChevronDown size={15} className={`transition-transform duration-200 ${openAccordion === "details" ? "rotate-180" : ""}`} />
                    </button>
                    {openAccordion === "details" && (
                      <div className="p-4 pt-0 text-xs text-neutral-600 space-y-2 border-t border-neutral-100">
                        <p className="leading-relaxed pt-2">{product.description}</p>
                        <div className="pt-2 space-y-1.5 text-neutral-800">
                          <div><strong>Fabric Weight:</strong> {product.fabric}</div>
                          <div><strong>Composition:</strong> {product.composition}</div>
                          <div><strong>Fit Profile:</strong> {product.fit}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border border-neutral-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("care")}
                      className="w-full p-4 flex items-center justify-between text-left text-xs font-bold uppercase text-neutral-900 hover:bg-neutral-50 transition"
                    >
                      <span>Fabric &amp; Wash Care</span>
                      <ChevronDown size={15} className={`transition-transform duration-200 ${openAccordion === "care" ? "rotate-180" : ""}`} />
                    </button>
                    {openAccordion === "care" && (
                      <div className="p-4 pt-0 text-xs text-neutral-600 space-y-1.5 border-t border-neutral-100">
                        <ul className="list-disc pl-4 pt-2 space-y-1 text-neutral-700">
                          {product.care.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="border border-neutral-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("shipping")}
                      className="w-full p-4 flex items-center justify-between text-left text-xs font-bold uppercase text-neutral-900 hover:bg-neutral-50 transition"
                    >
                      <span>Shipping &amp; Return Policy</span>
                      <ChevronDown size={15} className={`transition-transform duration-200 ${openAccordion === "shipping" ? "rotate-180" : ""}`} />
                    </button>
                    {openAccordion === "shipping" && (
                      <div className="p-4 pt-0 text-xs text-neutral-600 space-y-2 border-t border-neutral-100">
                        <p className="pt-2 leading-relaxed">
                          Complimentary express delivery across India within 3–5 business days. International shipping calculated at checkout.
                        </p>
                        <p className="leading-relaxed">
                          Hassle-free size exchanges and returns accepted within 14 days of delivery for unworn items with original tags attached.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── "COMPLETE THE LOOK" / RELATED T-SHIRTS GRID ─── */}
        <section className="pt-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-sans font-bold text-2xl sm:text-3xl uppercase tracking-tight text-neutral-900">
                More From Drop 001
              </h3>
              <p className="text-xs text-neutral-500 mt-1">Recommended heavyweight t-shirts</p>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition uppercase tracking-wider"
            >
              View All T-Shirts →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-300 border border-neutral-300 rounded-xl overflow-hidden shadow-xs">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                className="group flex flex-col justify-between bg-white p-3.5 sm:p-6 transition hover:bg-neutral-50"
              >
                <div className="relative aspect-[4/5] w-full flex items-center justify-center overflow-hidden py-2 sm:py-3 bg-transparent">
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-1.5 sm:p-2 transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="pt-3 sm:pt-4 border-t border-neutral-200">
                  <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-widest block truncate">{item.category}</span>
                  <h4 className="text-[11px] sm:text-xs font-bold uppercase text-neutral-900 truncate mt-0.5">
                    {item.name}
                  </h4>
                  <div className="mt-1 sm:mt-1.5 flex items-baseline justify-between text-[11px] sm:text-xs">
                    <span className="font-bold text-neutral-900">₹{item.price.toLocaleString("en-IN")}</span>
                    {item.compare_price && (
                      <span className="line-through text-neutral-400 text-[10px] sm:text-[11px]">
                        ₹{item.compare_price.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* ─── SIZE & MEASUREMENT GUIDE MODAL ─── */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4">
          <div
            onClick={() => setShowSizeGuide(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl z-10 font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-5">
              <h3 className="font-bold text-lg uppercase tracking-tight text-neutral-900">
                T-Shirt Size &amp; Measurement Guide
              </h3>
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="p-1 rounded-full border border-neutral-300 hover:bg-black hover:text-white transition"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-neutral-600 mb-4">
              All measurements are taken with the garment laid flat. Cut with a boxy, dropped-shoulder streetwear drape.
            </p>

            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 uppercase text-[10px] font-semibold">
                  <th className="py-2.5">Size</th>
                  <th className="py-2.5">Chest (inches)</th>
                  <th className="py-2.5">Length (cm)</th>
                  <th className="py-2.5">Shoulder (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800">
                <tr>
                  <td className="py-2.5 font-bold">S</td>
                  <td className="py-2.5">38 – 40</td>
                  <td className="py-2.5">70</td>
                  <td className="py-2.5">46</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold">M</td>
                  <td className="py-2.5">40 – 42</td>
                  <td className="py-2.5">72</td>
                  <td className="py-2.5">48</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold">L</td>
                  <td className="py-2.5">42 – 44</td>
                  <td className="py-2.5">74</td>
                  <td className="py-2.5">50</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold">XL</td>
                  <td className="py-2.5">44 – 46</td>
                  <td className="py-2.5">76</td>
                  <td className="py-2.5">52</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── FULLSCREEN PHOTO MODAL ─── */}
      {showFullscreen && (
        <div className="fixed inset-0 z-[10006] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setShowFullscreen(false)}
            aria-label="Close fullscreen"
            className="absolute top-6 right-6 size-10 rounded-full bg-white/20 text-white grid place-items-center hover:bg-white hover:text-black transition"
          >
            <X size={18} />
          </button>
          <div className="relative w-full max-w-4xl aspect-[4/5] max-h-[85vh]">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
