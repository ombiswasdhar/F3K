import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Scissors, Layers, ShieldCheck, Sparkles } from "lucide-react";
import F3KNavbar from "@/components/f3k/F3KNavbar";
import F3KSidebars from "@/components/f3k/F3KSidebars";
import F3KFooter from "@/components/f3k/F3KFooter";

export const metadata: Metadata = {
  title: "About the Atelier — Piecework Over Print | FUTURE3000",
  description:
    "Discover the FUTURE3000 philosophy: luxury heavyweight t-shirts crafted by stitching multicolored cotton panels together instead of surface printing.",
};

// Spliced T-Shirts Gallery Data (Authentic F3K Atelier Garment Development)
const SPLICED_TEES = [
  {
    id: 101,
    name: "ARCH-01 Architectural Panel Tee",
    slug: "arch-01-panel-tee",
    panels: "Curved Engineered Panels",
    gsm: "280 GSM Combed Cotton",
    colorway: "Obsidian, Charcoal Black",
    image: "/products/f3k/ARCH-01/front.png",
    price: 3400,
  },
  {
    id: 102,
    name: "SANCTUM Spliced Panel Tee",
    slug: "sanctum-spliced-tee",
    panels: "Multi-Panel Organic Cuts",
    gsm: "290 GSM Loopback Cotton",
    colorway: "Mineral Slate Blue, Charcoal",
    image: "/products/f3k/SANCTUM/front.png",
    price: 3600,
  },
  {
    id: 103,
    name: "MONOLITH-01 Stonewashed Tee",
    slug: "monolith-01-stonewashed-tee",
    panels: "Engineered Architectural Seams",
    gsm: "280 GSM Stonewashed Cotton",
    colorway: "Warm Greige, Taupe",
    image: "/products/f3k/MONOLITH 01/front.png",
    price: 3400,
  },
  {
    id: 104,
    name: "CROT-01 Orbital Signal Tee",
    slug: "crot-01-orbital-tee",
    panels: "Orbital Axis & Vertical Spine",
    gsm: "280 GSM Mineral Washed",
    colorway: "Washed Carbon Slate",
    image: "/products/f3k/CROT 01/front.png",
    price: 3200,
  },
  {
    id: 105,
    name: "BEMUTH-01 Architectural Tee",
    slug: "bemuth-01-architectural-tee",
    panels: "Contour Draped Lines",
    gsm: "270 GSM Compact Cotton",
    colorway: "Washed Sand, Greige",
    image: "/products/f3k/BEMUTH 01/front.png",
    price: 3600,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#ece9e2] text-neutral-900 selection:bg-black selection:text-white flex flex-col justify-between">
      {/* Floating Pill Navigation */}
      <F3KNavbar />

      {/* Main Editorial Canvas Wrapper with Outer Painterly Gallery Framing */}
      <main className="flex-1 w-full pt-20 sm:pt-24 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-12 max-w-[1500px] mx-auto">
        {/* Monograph Art Page Container */}
        <div className="relative bg-white border border-neutral-300 shadow-2xl rounded-none overflow-hidden p-6 sm:p-12 lg:p-16">
          
          {/* ─── 1. TOP EDITORIAL BAR (Centered) ─── */}
          <header className="flex items-center justify-center gap-6 sm:gap-10 pb-8 sm:pb-12 border-b border-neutral-200 text-xs font-archivo font-bold uppercase tracking-[0.18em]">
            <span className="text-black">ABOUT F3K</span>
            <span className="text-neutral-300">•</span>
            <Link 
              href="/products" 
              className="text-neutral-600 hover:text-black underline underline-offset-4 transition"
            >
              SHOP COLLECTION →
            </Link>
          </header>

          {/* ─── 2. THE BLURRED MASTHEAD & OVERLAPPING PORTRAIT SECTION ─── */}
          <section className="relative pt-8 sm:pt-12 pb-12 sm:pb-16 flex flex-col items-center">
            
            {/* The Giant Blurred Typographic Masthead */}
            <div className="w-full text-center overflow-hidden pointer-events-none select-none py-4">
              <h1 
                className="font-archivo font-extrabold uppercase text-neutral-950 tracking-[-0.02em] leading-none text-6xl sm:text-8xl md:text-9xl lg:text-[13rem]"
                style={{
                  filter: "blur(14px)",
                  WebkitFilter: "blur(14px)",
                  transform: "scale(1.03)",
                  opacity: 0.88,
                }}
              >
                FUTURE 3000
              </h1>
            </div>

            {/* Overlapping Central Portrait Cutout */}
            <div className="relative -mt-20 sm:-mt-32 md:-mt-44 z-10 flex flex-col items-center">
              <div className="relative w-48 sm:w-64 md:w-72 aspect-[3/4] bg-neutral-900 rounded-none overflow-hidden shadow-2xl border border-neutral-300 group">
                <Image
                  src="/models/men_model.jpg"
                  alt="FUTURE 3000 Spliced Atelier Portrait"
                  fill
                  priority
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover object-top filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Subtle Inner Grain Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              </div>
            </div>

            {/* Left and Right Side Micro-Manifesto Callouts */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 mt-6 text-center sm:text-left text-xs font-sans text-neutral-500 px-2">
              <div className="max-w-[280px] leading-relaxed">
                Engineered piecework exploring form, heavyweight textile physics, and architectural silhouette.
              </div>
              <div className="max-w-[280px] text-center sm:text-right leading-relaxed">
                <div className="font-medium text-neutral-800">Multi-panel cut-and-sew construction</div>
                <div>Drop 001 Collection • 5 Silhouettes</div>
              </div>
            </div>
          </section>

          {/* ─── 3. HORIZONTAL RUNNING TICKER / MARQUEE ─── */}
          <div className="w-full border-y border-neutral-300 py-3 my-6 sm:my-10 overflow-hidden bg-neutral-50/50">
            <div className="flex items-center gap-8 whitespace-nowrap font-sans text-xs tracking-[0.24em] text-neutral-500 uppercase animate-marquee select-none">
              <span>F3K.STUDIO</span>
              <span>•</span>
              <span className="font-bold text-black font-archivo">FUTURE 3000</span>
              <span>•</span>
              <span>F3K.STUDIO</span>
              <span>•</span>
              <span className="font-bold text-black font-archivo">FUTURE 3000</span>
              <span>•</span>
              <span>F3K.STUDIO</span>
              <span>•</span>
              <span className="font-bold text-black font-archivo">FUTURE 3000</span>
              <span>•</span>
              <span>F3K.STUDIO</span>
              <span>•</span>
              <span className="font-bold text-black font-archivo">FUTURE 3000</span>
            </div>
          </div>

          {/* ─── 4. BIG STATEMENT HEADLINE (F3K Brand Ethos) ─── */}
          <section className="py-12 sm:py-20 text-center max-w-4xl mx-auto">
            <h2 className="font-archivo font-extrabold uppercase text-neutral-950 tracking-[-0.02em] leading-[0.95] text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
              PRESENCE OVER
              <span className="block mt-1 sm:mt-2 text-neutral-950">APPROVAL</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-neutral-500 font-sans max-w-xl mx-auto leading-relaxed">
              Progress-oriented streetwear engineered in India. Heavyweight combed cottons sculpted through structural panel seams.
            </p>
          </section>

          {/* ─── 5. THE 3-COLUMN EDITORIAL STORY GRID (Pure Brand Philosophy) ─── */}
          <section className="pt-8 pb-16 sm:pb-24 border-t border-neutral-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Column 1: Left Headline & Secondary Portrait */}
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <span className="font-sans text-xs font-semibold tracking-[0.14em] text-neutral-400 uppercase block mb-2">
                    THE ATELIER PHILOSOPHY
                  </span>
                  <h3 className="font-archivo font-bold uppercase tracking-[-0.01em] text-3xl sm:text-4xl text-neutral-900 leading-tight">
                    STRUCTURAL SEAMS<br />
                    OVER SURFACE<br />
                    PRINTING
                  </h3>
                </div>

                {/* Secondary Artisan Portrait */}
                <div className="relative w-40 sm:w-48 aspect-[3/4] bg-neutral-100 rounded-none overflow-hidden border border-neutral-300 shadow-md">
                  <Image
                    src="/models/women_model.jpg"
                    alt="Atelier Craft Portrait"
                    fill
                    sizes="192px"
                    className="object-cover object-top filter grayscale contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </div>

              {/* Column 2: Center Close-Up Patchwork Swatch / Macro Detail */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3">
                <div className="relative w-full aspect-[4/5] sm:aspect-square max-w-sm bg-neutral-950 rounded-none overflow-hidden border border-neutral-300 shadow-lg group">
                  <Image
                    src="/products/f3k/ARCH-01/tech.png"
                    alt="F3K ARCH-01 Technical Panel Blueprint"
                    fill
                    sizes="(max-width: 1024px) 100vw, 384px"
                    className="object-contain p-4 bg-neutral-900 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-sans font-semibold tracking-wider text-black uppercase rounded-none border border-neutral-200">
                    TECHNICAL SPEC 001
                  </div>
                </div>
                <div className="text-center font-sans text-xs text-neutral-500 leading-relaxed">
                  <div>Multi-panel contour geometry.</div>
                  <div>Engineered for permanent drape.</div>
                </div>
              </div>

              {/* Column 3: Authentic F3K Narrative in DM Sans */}
              <div className="lg:col-span-4 space-y-5 text-xs sm:text-sm font-sans leading-relaxed text-neutral-600">
                <div className="font-sans text-xs font-semibold tracking-[0.14em] text-neutral-400 uppercase space-y-1">
                  <div>PIECEWORK CONSTRUCTION</div>
                  <div>ZERO SURFACE PLASTISOL</div>
                </div>

                <p className="text-neutral-600 font-sans leading-relaxed pt-2">
                  F3K (Future 3000) is built on architectural restraint and progressive tailoring. Where standard streetwear relies on ink printed across a blank canvas, our garments achieve form through complex multi-panel piecework. We stitch high-density, fiber-dyed cotton cuts together to create permanent geometric silhouettes.
                </p>

                <p className="text-neutral-600 font-sans leading-relaxed">
                  There are no surface plastisol inks to crack, peel, or stiffen over time. Every seam is structurally reinforced, ensuring the garment breathes naturally, falls with considered weight, and retains its shape wash after wash.
                </p>

                <div className="pt-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 font-sans text-xs font-bold tracking-wider uppercase text-neutral-950 underline underline-offset-8 hover:text-neutral-600 transition"
                  >
                    EXPLORE THE COLLECTION <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

            </div>
          </section>

          {/* ─── 6. THE SPLICED T-SHIRT ARCHITECTURAL GALLERY ─── */}
          <section className="py-14 sm:py-20 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-10 sm:mb-14">
              <div>
                <span className="font-sans text-xs font-semibold tracking-[0.14em] text-neutral-400 uppercase block mb-1">
                  ANATOMY OF DROP 001
                </span>
                <h3 className="font-archivo font-bold uppercase tracking-[-0.01em] text-3xl sm:text-5xl text-neutral-900">
                  PIECEWORK STUDIES
                </h3>
              </div>
              <p className="font-sans text-xs text-neutral-500 uppercase tracking-wider max-w-sm sm:text-right">
                5 heavyweight silhouettes engineered without printed inks
              </p>
            </div>

            {/* Product Grid: 2 side-by-side on mobile, 5 on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {SPLICED_TEES.map((tee) => (
                <Link
                  key={tee.id}
                  href={`/products/${tee.slug}`}
                  className="group relative flex flex-col justify-between bg-white hover:bg-neutral-50/60 p-4 sm:p-6 rounded-none border border-neutral-200 transition-all duration-200 hover:border-black hover:shadow-md"
                >
                  {/* Top Spec Badges */}
                  <div className="flex items-center justify-between gap-1 w-full text-[10px] sm:text-[11px] font-sans uppercase tracking-wider text-neutral-400">
                    <span className="truncate">{tee.panels}</span>
                    <span className="font-bold text-neutral-700 shrink-0">{tee.gsm}</span>
                  </div>

                  {/* Clean Cutout T-Shirt Image Floating on Canvas */}
                  <div className="relative aspect-[4/5] w-full my-4 flex items-center justify-center overflow-hidden py-2 bg-transparent">
                    <Image
                      src={tee.image}
                      alt={tee.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                      className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>

                  {/* Product Details & Seam Highlights */}
                  <div className="pt-3 border-t border-neutral-200 space-y-1">
                    <span className="text-[11px] font-sans text-neutral-500 uppercase tracking-wider block truncate">
                      {tee.colorway}
                    </span>
                    <h4 className="text-xs sm:text-sm font-archivo font-bold uppercase text-neutral-900 truncate">
                      {tee.name}
                    </h4>
                    <div className="flex items-baseline justify-between pt-1 font-sans">
                      <span className="text-xs font-bold text-neutral-900">
                        ₹{tee.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[11px] font-sans text-neutral-500 group-hover:text-black transition">
                        View Piece →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ─── 7. TECHNICAL COMPARISON: SURFACE PRINTING VS. PHYSICAL PIECEWORK ─── */}
          <section className="py-12 sm:py-16 border-t border-neutral-200 bg-neutral-50/40 -mx-6 sm:-mx-12 lg:-mx-16 px-6 sm:px-12 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="font-sans text-xs font-semibold tracking-[0.14em] text-neutral-400 uppercase block mb-1">
                  ATELIER STANDARDS
                </span>
                <h3 className="font-archivo font-bold uppercase text-2xl sm:text-4xl text-neutral-900 tracking-[-0.01em]">
                  SURFACE PRINT VS. SPLICED CONSTRUCTION
                </h3>
              </div>

              {/* Minimal Comparison Table */}
              <div className="border border-neutral-300 rounded-none overflow-hidden bg-white text-xs font-sans">
                <div className="grid grid-cols-3 bg-neutral-950 text-white font-sans text-[11px] sm:text-xs tracking-wider uppercase font-bold p-3 sm:p-4">
                  <div>SPECIFICATION</div>
                  <div className="text-neutral-400">CONVENTIONAL PRINT</div>
                  <div className="text-emerald-400">F3K PIECEWORK</div>
                </div>

                <div className="divide-y divide-neutral-200">
                  <div className="grid grid-cols-3 p-3.5 sm:p-4 items-center">
                    <span className="font-bold text-neutral-900">Graphic Durability</span>
                    <span className="text-neutral-500">Cracks, peels & flakes after 5–10 washes</span>
                    <span className="font-semibold text-neutral-950 flex items-center gap-1.5">
                      <Check size={14} className="text-emerald-600 shrink-0" /> Permanent structural seams
                    </span>
                  </div>

                  <div className="grid grid-cols-3 p-3.5 sm:p-4 items-center">
                    <span className="font-bold text-neutral-900">Skin Breathability</span>
                    <span className="text-neutral-500">Plastisol seals pores, traps perspiration</span>
                    <span className="font-semibold text-neutral-950 flex items-center gap-1.5">
                      <Check size={14} className="text-emerald-600 shrink-0" /> 100% breathable combed jersey
                    </span>
                  </div>

                  <div className="grid grid-cols-3 p-3.5 sm:p-4 items-center">
                    <span className="font-bold text-neutral-900">Color Depth</span>
                    <span className="text-neutral-500">Surface ink fades & degrades under UV</span>
                    <span className="font-semibold text-neutral-950 flex items-center gap-1.5">
                      <Check size={14} className="text-emerald-600 shrink-0" /> Fiber-dyed cotton cuts hold tone
                    </span>
                  </div>

                  <div className="grid grid-cols-3 p-3.5 sm:p-4 items-center">
                    <span className="font-bold text-neutral-900">Garment Drape</span>
                    <span className="text-neutral-500">Stiff chest block distorts silhouette</span>
                    <span className="font-semibold text-neutral-950 flex items-center gap-1.5">
                      <Check size={14} className="text-emerald-600 shrink-0" /> Architectural fluid drape
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── 8. BOTTOM MONOGRAPH BASELINE ─── */}
          <footer className="pt-8 sm:pt-12 mt-8 border-t border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-neutral-500 uppercase tracking-wider">
            <div>FUTURE 3000 • DROP 001 ATELIER</div>
            <div className="text-neutral-700 font-semibold font-archivo">PRESENCE OVER APPROVAL</div>
          </footer>

        </div>
      </main>

      {/* Fixed Architectural Sidebars for Desktop */}
      <F3KSidebars color="black" desktopOnly permanent />

      {/* Atelier Footer */}
      <F3KFooter />
    </div>
  );
}
