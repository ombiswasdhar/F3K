import F3KNavbar from "@/components/f3k/F3KNavbar";
import F3KFooter from "@/components/f3k/F3KFooter";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export interface PDPColor {
  name: string;
  hex: string;
  image?: string;
}

export interface PDPProduct {
  id: number;
  name: string;
  slug: string;
  indexNumber: string;
  category: string;
  price: number;
  compare_price: number | null;
  description: string;
  short_description: string;
  thumbnail: string;
  images: string[];
  sizes: string[];
  colors: PDPColor[];
  fabric: string;
  composition: string;
  fit: string;
  care: string[];
  stock_quantity: number;
  gender: string;
}

const defaultCare = [
  "Machine wash cold inside-out with similar colors",
  "Do not bleach or tumble dry",
  "Hang dry in shade to maintain silhouette",
  "Iron on low heat on reverse side"
];

export const mockProductsDetail: PDPProduct[] = [
  {
    id: 101,
    name: "ARCH-01 Architectural Panel Tee",
    slug: "arch-01-panel-tee",
    indexNumber: "01",
    category: "Heavyweight",
    price: 3400,
    compare_price: 4200,
    description: "ARCH-01 is a structured oversized short-sleeve T-shirt constructed with curved architectural panel seams, visible double-needle seam definition, dropped shoulders, and a substantial 32mm ribbed crew neckline. Features centered dark tonal F3K front branding and vertical FUTURE 3000 spine lettering.",
    short_description: "280 GSM heavyweight combed cotton with engineered curved panel architecture.",
    thumbnail: "/products/f3k/ARCH-01/front.png",
    images: [
      "/products/f3k/ARCH-01/front.png",
      "/products/f3k/ARCH-01/back.png",
      "/products/f3k/ARCH-01/tech.png"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Obsidian Charcoal", hex: "#1A1B1D" }
    ],
    fabric: "280 GSM Heavyweight Combed Cotton",
    composition: "100% Combed Organic Cotton",
    fit: "Structured Oversized Boxy Fit",
    care: defaultCare,
    stock_quantity: 24,
    gender: "Unisex"
  },
  {
    id: 102,
    name: "SANCTUM Spliced Panel Tee",
    slug: "sanctum-spliced-tee",
    indexNumber: "02",
    category: "Boxy Fit",
    price: 3600,
    compare_price: 4500,
    description: "SANCTUM is an engineered multi-panel short-sleeve T-shirt defined by curved cut-and-sew geometric piecework, broad relaxed sleeves, and a washed slate blue surface. Its identity is carried entirely by fabric architecture and seam construction rather than surface inks. Features balanced rear panel geometry and clean crew neckline.",
    short_description: "290 GSM spliced organic cotton piecework constructed without surface print.",
    thumbnail: "/products/f3k/SANCTUM/front.png",
    images: [
      "/products/f3k/SANCTUM/front.png",
      "/products/f3k/SANCTUM/back.png",
      "/products/f3k/SANCTUM/tech.png"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Mineral Slate Blue", hex: "#323D46" }
    ],
    fabric: "290 GSM Heavy Loopback Cotton",
    composition: "100% Premium Cotton Piecework",
    fit: "Boxy Reconstructed Drape",
    care: defaultCare,
    stock_quantity: 18,
    gender: "Unisex"
  },
  {
    id: 103,
    name: "MONOLITH-01 Stonewashed Architectural Tee",
    slug: "monolith-01-stonewashed-tee",
    indexNumber: "03",
    category: "Vintage Washed",
    price: 3400,
    compare_price: 4200,
    description: "MONOLITH-01 is a structured oversized T-shirt in stonewashed warm greige. Defined by curved engineered panel seams, dropped shoulders, substantial ribbed collar, centered dark tonal F3K chest mark, and vertical FUTURE 3000 back lettering framed by linear technical details.",
    short_description: "280 GSM stonewashed cotton with curved engineered seams and spine typography.",
    thumbnail: "/products/f3k/MONOLITH 01/front.png",
    images: [
      "/products/f3k/MONOLITH 01/front.png",
      "/products/f3k/MONOLITH 01/back.png",
      "/products/f3k/MONOLITH 01/tech.png"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Warm Greige", hex: "#9A9188" }
    ],
    fabric: "280 GSM Stonewashed Cotton",
    composition: "100% Stonewashed Cotton",
    fit: "Structured Oversized Silhouette",
    care: defaultCare,
    stock_quantity: 15,
    gender: "Unisex"
  },
  {
    id: 104,
    name: "CROT-01 Orbital Signal Washed Tee",
    slug: "crot-01-orbital-tee",
    indexNumber: "04",
    category: "Graphic Tees",
    price: 3200,
    compare_price: 3900,
    description: "CROT-01 ARCH-02 Orbital Signal Tee crafted from 280 GSM mineral washed jersey. Features an engineered orbital trajectory axis line design, spine vertical FUTURE 3000 branding, high-density ribbed collar, and wide-sleeve boxy drape.",
    short_description: "280 GSM mineral washed jersey with technical orbital trajectory graphic.",
    thumbnail: "/products/f3k/CROT 01/front.png",
    images: [
      "/products/f3k/CROT 01/front.png",
      "/products/f3k/CROT 01/back.png",
      "/products/f3k/CROT 01/tech.png"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Carbon Slate", hex: "#222325" }
    ],
    fabric: "280 GSM Mineral Washed Jersey",
    composition: "100% Combed Cotton",
    fit: "Wide-Sleeve Boxy Silhouette",
    care: defaultCare,
    stock_quantity: 20,
    gender: "Unisex"
  },
  {
    id: 105,
    name: "BEMUTH-01 Architectural Layered Tee",
    slug: "bemuth-01-architectural-tee",
    indexNumber: "05",
    category: "Minimalist",
    price: 3600,
    compare_price: 4400,
    description: "BEMUTH-01 Architectural Tee engineered from 270 GSM compact combed cotton. Characterized by architectural layered contour drape lines, starburst crosshairs, centered F3K chest mark, and the BUILT FOR WHAT'S NEXT editorial signature.",
    short_description: "270 GSM compact combed cotton with architectural contour drape lines.",
    thumbnail: "/products/f3k/BEMUTH 01/front.png",
    images: [
      "/products/f3k/BEMUTH 01/front.png",
      "/products/f3k/BEMUTH 01/back.png"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Washed Sand Greige", hex: "#D4CDC3" }
    ],
    fabric: "270 GSM Premium Compact Cotton",
    composition: "100% Combed Cotton",
    fit: "Drop-Shoulder Relaxed Boxy",
    care: defaultCare,
    stock_quantity: 16,
    gender: "Unisex"
  }
];

const legacySlugMap: Record<string, string> = {
  "statement-tee": "arch-01-panel-tee",
  "cyber-matrix-tee": "crot-01-orbital-tee",
  "archival-monogram-tee": "monolith-01-stonewashed-tee",
  "futurist-phantom-tee": "sanctum-spliced-tee",
  "tokyo-atelier-tee": "bemuth-01-architectural-tee",
  "retro-racing-tee": "arch-01-panel-tee",
  "raw-edge-tee": "sanctum-spliced-tee",
  "subversive-distortion-tee": "crot-01-orbital-tee",
  "acid-washed-tee": "monolith-01-stonewashed-tee",
  "echo-horizon-tee": "bemuth-01-architectural-tee",
  "monolith-heavy-tee": "monolith-01-stonewashed-tee",
  "chrome-orbit-tee": "crot-01-orbital-tee",
  "signature-back-tee": "crot-01-orbital-tee",
  "studio-fold-minimal-tee": "bemuth-01-architectural-tee",
  "campaign-exclusive-hang-tee": "monolith-01-stonewashed-tee",
  "f3k-cap": "arch-01-panel-tee"
};

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const targetSlug = legacySlugMap[slug] || slug;
  const product = mockProductsDetail.find((p) => p.slug === targetSlug);

  if (!product) {
    return { title: "Product Not Found — FUTURE3000" };
  }

  return {
    title: `${product.name} — FUTURE3000`,
    description: product.description,
    openGraph: {
      title: `${product.name} — FUTURE3000`,
      description: product.description,
      images: [{ url: product.thumbnail }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const targetSlug = legacySlugMap[slug] || slug;

  const product = mockProductsDetail.find((p) => p.slug === targetSlug);

  if (!product) {
    return notFound();
  }

  const relatedProducts = mockProductsDetail
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-black selection:text-white flex flex-col justify-between">
      {/* Consistent Hero Navigation Bar */}
      <F3KNavbar />

      <main className="flex-1 w-full pt-[50px] sm:pt-[58px] lg:pt-[62px] pb-28 sm:pb-20">
        <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
      </main>

      <F3KFooter />
    </div>
  );
}
