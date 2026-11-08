"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Check,
  ChevronDown,
  X,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";

export interface F3KProduct {
  id: number;
  name: string;
  slug: string;
  category: "Graphic Tees" | "Boxy Fit" | "Vintage Washed" | "Heavyweight" | "Minimalist";
  color: string;
  colorHex: string;
  sizes: string[];
  price: number;
  originalPrice: number;
  image: string;
  hoverImage?: string;
  specs: {
    fabric: string;
    composition: string;
    fit: string;
    details: string;
  };
}

export const f3kProducts: F3KProduct[] = [
  {
    id: 101,
    name: "ARCH-01 Architectural Panel Tee",
    slug: "arch-01-panel-tee",
    category: "Heavyweight",
    color: "Obsidian Charcoal",
    colorHex: "#1a1b1d",
    sizes: ["S", "M", "L", "XL"],
    price: 3400,
    originalPrice: 4200,
    image: "/products/f3k/ARCH-01/front.png",
    hoverImage: "/products/f3k/ARCH-01/back.png",
    specs: {
      fabric: "280 GSM Combed Cotton",
      composition: "100% Combed Organic Cotton",
      fit: "Structured Oversized Boxy Fit",
      details: "Curved engineered panel seams, visible seam definition, ribbed crew neck, vertical FUTURE 3000 back lettering."
    }
  },
  {
    id: 102,
    name: "SANCTUM Spliced Panel Tee",
    slug: "sanctum-spliced-tee",
    category: "Boxy Fit",
    color: "Mineral Slate Blue",
    colorHex: "#323d46",
    sizes: ["S", "M", "L", "XL"],
    price: 3600,
    originalPrice: 4500,
    image: "/products/f3k/SANCTUM/front.png",
    hoverImage: "/products/f3k/SANCTUM/back.png",
    specs: {
      fabric: "290 GSM Heavy Loopback Cotton",
      composition: "100% Premium Cotton",
      fit: "Boxy Reconstructed Drape",
      details: "Multi-panel engineered curved piecework, cut-and-sew spliced construction without surface printing, washed raw edge finish."
    }
  },
  {
    id: 103,
    name: "MONOLITH-01 Stonewashed Tee",
    slug: "monolith-01-stonewashed-tee",
    category: "Vintage Washed",
    color: "Warm Greige",
    colorHex: "#9a9188",
    sizes: ["S", "M", "L", "XL"],
    price: 3400,
    originalPrice: 4200,
    image: "/products/f3k/MONOLITH 01/front.png",
    hoverImage: "/products/f3k/MONOLITH 01/back.png",
    specs: {
      fabric: "280 GSM Stonewashed Cotton",
      composition: "100% Stonewashed Cotton",
      fit: "Structured Oversized Silhouette",
      details: "Curved architectural seams, centered dark tonal F3K front mark, linear technical spine framing."
    }
  },
  {
    id: 104,
    name: "CROT-01 Orbital Signal Tee",
    slug: "crot-01-orbital-tee",
    category: "Graphic Tees",
    color: "Carbon Slate",
    colorHex: "#222325",
    sizes: ["S", "M", "L", "XL"],
    price: 3200,
    originalPrice: 3900,
    image: "/products/f3k/CROT 01/front.png",
    hoverImage: "/products/f3k/CROT 01/back.png",
    specs: {
      fabric: "280 GSM Mineral Washed Jersey",
      composition: "100% Combed Cotton",
      fit: "Wide-Sleeve Boxy Silhouette",
      details: "Orbital trajectory axis line design, spine vertical FUTURE 3000 branding, high-density ribbed collar."
    }
  },
  {
    id: 105,
    name: "BEMUTH-01 Architectural Tee",
    slug: "bemuth-01-architectural-tee",
    category: "Minimalist",
    color: "Washed Sand Greige",
    colorHex: "#d4cdc3",
    sizes: ["S", "M", "L", "XL"],
    price: 3600,
    originalPrice: 4400,
    image: "/products/f3k/BEMUTH 01/front.png",
    hoverImage: "/products/f3k/BEMUTH 01/back.png",
    specs: {
      fabric: "270 GSM Premium Compact Cotton",
      composition: "100% Cotton",
      fit: "Drop-Shoulder Relaxed Boxy",
      details: "Architectural layered contour lines, starburst crosshairs, centered F3K FUTURE 3000 chest mark, BUILT FOR WHAT'S NEXT signature."
    }
  }
];

export default function F3KCatalogGrid() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams?.get("search")?.toLowerCase().trim() || "";
  const urlCategory = searchParams?.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    if (urlCategory) {
      const match = ["All", "Graphic Tees", "Boxy Fit", "Vintage Washed", "Heavyweight", "Minimalist"].find(
        (c) => c.toLowerCase() === urlCategory.toLowerCase()
      );
      if (match) setSelectedCategory(match);
    }
  }, [urlCategory]);
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedPrice, setSelectedPrice] = useState<string>("All");
  const [quickViewProduct, setQuickViewProduct] = useState<F3KProduct | null>(null);
  const [selectedSizesByProduct, setSelectedSizesByProduct] = useState<Record<number, string>>({});
  const [addedItemIds, setAddedItemIds] = useState<Record<number, boolean>>({});

  const { addItem, setIsOpen: setCartOpen } = useCartStore();
  const { toggleItem, hasItem } = useWishlistStore();

  const categories = ["All", "Graphic Tees", "Boxy Fit", "Vintage Washed", "Heavyweight", "Minimalist"];
  const sizeOptions = ["All", "S", "M", "L", "XL"];

  const filteredProducts = useMemo(() => {
    return f3kProducts
      .filter((p) => {
        if (urlSearch && !p.name.toLowerCase().includes(urlSearch) && !p.category.toLowerCase().includes(urlSearch)) {
          return false;
        }
        if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
        if (selectedSize !== "All" && !p.sizes.includes(selectedSize)) return false;
        return true;
      })
      .sort((a, b) => {
        if (selectedPrice === "price-low") return a.price - b.price;
        if (selectedPrice === "price-high") return b.price - a.price;
        return a.id - b.id;
      });
  }, [selectedCategory, selectedSize, selectedPrice, urlSearch]);

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizesByProduct((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: F3KProduct, sizeOverride?: string) => {
    const size = sizeOverride || selectedSizesByProduct[product.id] || product.sizes[0];
    addItem({
      id: `${product.id}-${size}-${product.color}`,
      product_id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size,
      color: product.color,
      thumbnail: product.image,
    });

    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <section id="catalog" className="w-full bg-white text-[#111111] border-b border-neutral-300">
      {/* 1. Header Bar — Minimal Clean Title */}
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 pt-10 sm:pt-20 pb-8 text-center">
        <h2 className="font-archivo font-extrabold text-3xl sm:text-5xl uppercase tracking-[-0.02em] text-[#0a0a0a]">
          {urlSearch ? `Search: "${urlSearch}"` : "T-Shirts Lineup"}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-neutral-500 font-dm">
          {filteredProducts.length} heavyweight streetwear tees available
        </p>

        {/* Quick Category Filter Pills - 1 row & swipable on mobile */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto no-scrollbar flex-nowrap px-4 sm:px-0 sm:flex-wrap sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-none text-[11px] font-archivo font-bold uppercase tracking-wider transition-all cursor-pointer ${selectedCategory === cat
                  ? "bg-[#0a0a0a] text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Filter Bar with Darker Borders - 1 row & swipable on mobile, 4-col on desktop */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-y border-neutral-300">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex overflow-x-auto no-scrollbar md:grid md:grid-cols-4 divide-x divide-neutral-300 border-x border-neutral-300 text-xs font-sans">
            {/* Category Filter */}
            <div className="relative group shrink-0 min-w-[140px] md:min-w-0 md:shrink px-4 py-3 sm:py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50 transition">
              <span className="text-neutral-500 truncate mr-2">
                Type: <strong className="text-neutral-900 font-medium">{selectedCategory}</strong>
              </span>
              <ChevronDown size={14} className="text-neutral-500 group-hover:text-black transition shrink-0" />
              <select
                aria-label="Filter by Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Size Filter */}
            <div className="relative group shrink-0 min-w-[120px] md:min-w-0 md:shrink px-4 py-3 sm:py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50 transition">
              <span className="text-neutral-500 truncate mr-2">
                Size: <strong className="text-neutral-900 font-medium">{selectedSize}</strong>
              </span>
              <ChevronDown size={14} className="text-neutral-500 group-hover:text-black transition shrink-0" />
              <select
                aria-label="Filter by Size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              >
                {sizeOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="relative group shrink-0 min-w-[150px] md:min-w-0 md:shrink px-4 py-3 sm:py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50 transition">
              <span className="text-neutral-500 truncate mr-2">
                Sort: <strong className="text-neutral-900 font-medium">
                  {selectedPrice === "All" ? "Featured" : selectedPrice === "price-low" ? "Low to High" : "High to Low"}
                </strong>
              </span>
              <ChevronDown size={14} className="text-neutral-500 group-hover:text-black transition shrink-0" />
              <select
                aria-label="Sort by Price"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              >
                <option value="All">All Prices</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Product Grid - 2 side-by-side on mobile, 4 on desktop */}
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-300 border-x border-b border-neutral-300">
          {filteredProducts.map((product) => {
            const isAdded = addedItemIds[product.id];
            const isFavorited = hasItem(product.id);
            const currentSize = selectedSizesByProduct[product.id] || product.sizes[0];

            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between bg-white p-3 sm:p-5 lg:p-6 transition-all duration-200 hover:bg-neutral-50/50"
              >
                {/* Top Row: Clean Wishlist button in top-right */}
                <div className="flex items-center justify-end w-full mb-1 z-10">
                  <button
                    type="button"
                    onClick={() => toggleItem({
                      id: product.id,
                      product_id: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: product.price,
                      thumbnail: product.image,
                    })}
                    aria-label={`Save ${product.name} to wishlist`}
                    className="p-1 text-neutral-400 hover:text-black transition"
                  >
                    <Heart
                      size={15}
                      className={isFavorited ? "fill-black text-black" : "text-neutral-400"}
                    />
                  </button>
                </div>

                {/* Product Image Canvas (Clean cutout floating on white, clicking opens PDP) */}
                <div className="relative aspect-[4/5] w-full flex items-center justify-center overflow-hidden py-2 sm:py-4 bg-transparent">
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative w-full h-full cursor-pointer focus:outline-none"
                    aria-label={`View details for ${product.name}`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className={`object-contain p-1.5 sm:p-3 transition-all duration-300 ease-out group-hover:scale-105 ${product.hoverImage ? "group-hover:opacity-0" : ""
                        }`}
                    />
                    {product.hoverImage && (
                      <Image
                        src={product.hoverImage}
                        alt={`${product.name} alternate view`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-1.5 sm:p-3 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-105"
                      />
                    )}
                  </Link>

                  {/* Minimal Quick View on Hover */}
                  <div className="absolute bottom-2 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="rounded-none bg-[#0a0a0a]/90 text-white text-[10px] font-archivo font-bold uppercase tracking-widest px-3 py-1.5 shadow-md hover:bg-[#0a0a0a] transition cursor-pointer"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Information & Action Matrix */}
                <div className="pt-3 sm:pt-4 border-t border-neutral-200 flex flex-col gap-1.5 sm:gap-2">
                  {/* Size Selector */}
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-neutral-500 text-[10px] sm:text-[11px] font-archivo uppercase tracking-wider">Size</span>
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSizeSelect(product.id, s)}
                          className={`px-1.5 sm:px-2 py-0.5 rounded-none text-[10px] sm:text-[11px] font-archivo font-bold transition ${currentSize === s
                              ? "bg-[#0a0a0a] text-white font-medium"
                              : "text-neutral-600 hover:text-black bg-neutral-100"
                            }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Price */}
                  <div className="flex items-baseline justify-between gap-1.5 pt-0.5">
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-left text-[11px] sm:text-xs font-archivo font-bold uppercase text-neutral-950 hover:text-neutral-600 transition truncate tracking-tight"
                    >
                      {product.name}
                    </Link>
                    <span className="text-[11px] sm:text-xs font-bold text-neutral-950 shrink-0 font-sans">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Colorway & Details */}
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-500 font-dm">
                    <span className="truncate">{product.color}</span>
                    {product.originalPrice > product.price && (
                      <span className="line-through text-neutral-400 text-[10px] sm:text-[11px] shrink-0 font-sans">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product, currentSize)}
                    className={`mt-1 sm:mt-1.5 w-full py-2.5 px-2 sm:px-4 rounded-none text-[11px] sm:text-xs font-archivo font-bold uppercase tracking-[0.1em] flex items-center justify-center gap-1.5 transition duration-200 cursor-pointer ${isAdded
                        ? "bg-emerald-700 text-white"
                        : "bg-[#0a0a0a] text-white hover:bg-[#1f1f1f] active:scale-[0.99]"
                      }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} />
                        Added ({currentSize})
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        Add to Bag
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4">
          <div
            onClick={() => setQuickViewProduct(null)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl z-10 border border-neutral-300"
          >
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-1 rounded-full border border-neutral-300 hover:bg-black hover:text-white transition"
            >
              <X size={16} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-square w-full rounded-xl bg-neutral-50 p-4 border border-neutral-200">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="flex flex-col justify-between font-sans">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-neutral-900">
                    {quickViewProduct.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-lg font-bold text-black">
                      ₹{quickViewProduct.price.toLocaleString("en-IN")}
                    </span>
                    {quickViewProduct.originalPrice > quickViewProduct.price && (
                      <span className="text-xs text-neutral-400 line-through">
                        ₹{quickViewProduct.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 space-y-1.5 border-y border-neutral-200 py-3 text-xs font-sans text-neutral-700">
                    <div><strong>Fabric:</strong> {quickViewProduct.specs.fabric}</div>
                    <div><strong>Fit:</strong> {quickViewProduct.specs.fit}</div>
                    <div className="text-neutral-500 pt-1 leading-relaxed">{quickViewProduct.specs.details}</div>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs font-medium text-neutral-700 mb-1.5">Select Size</div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {quickViewProduct.sizes.map((s) => {
                        const active = (selectedSizesByProduct[quickViewProduct.id] || quickViewProduct.sizes[0]) === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleSizeSelect(quickViewProduct.id, s)}
                            className={`py-1.5 text-center text-xs font-medium rounded border transition ${active ? "border-black bg-black text-white" : "border-neutral-200 bg-white hover:border-black"
                              }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                      setCartOpen(true);
                    }}
                    className="w-full py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} />
                    Add to Bag
                  </button>
                  <Link
                    href={`/products/${quickViewProduct.slug}`}
                    className="text-center text-xs text-neutral-500 hover:text-black underline underline-offset-4 pt-1"
                  >
                    View Product Page →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
