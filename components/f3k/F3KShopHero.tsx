"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface F3KShopHeroProps {
  onCategoryChange?: (category: string) => void;
}

const TABS = [
  { id: "ALL", label: "ALL", category: "All" },
  { id: "UTOPIAN", label: "UTOPIAN", category: "Graphic Tees" },
  { id: "DYSTOPIAN", label: "DYSTOPIAN", category: "Vintage Washed" },
  { id: "TEES", label: "TEES", category: "Heavyweight" },
  { id: "TOPS", label: "TOPS", category: "Boxy Fit" },
  { id: "BOTTOMS", label: "BOTTOMS", category: "All" },
  { id: "OUTERWEAR", label: "OUTERWEAR", category: "All" },
];

export default function F3KShopHero({ onCategoryChange }: F3KShopHeroProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("ALL");

  useEffect(() => {
    const cat = searchParams?.get("category");
    if (cat) {
      const match = TABS.find((t) => t.category.toLowerCase() === cat.toLowerCase());
      if (match) setActiveTab(match.id);
    } else {
      setActiveTab("ALL");
    }
  }, [searchParams]);

  const handleTabClick = (tab: typeof TABS[number]) => {
    setActiveTab(tab.id);
    if (onCategoryChange) {
      onCategoryChange(tab.category);
    }
    if (tab.category === "All") {
      router.push("/products#catalog", { scroll: false });
    } else {
      router.push(`/products?category=${encodeURIComponent(tab.category)}#catalog`, { scroll: false });
    }
    const catalogEl = document.getElementById("catalog");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 text-white border-b border-neutral-300">
      {/* ─── 1. Architectural Concrete Background with Brutalist Moody Grading ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/concrete_architecture.jpg"
          alt="Collection 001 Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.72] contrast-[1.18] saturate-[0.8]"
        />
        {/* Dark Vignette and Directional Atmospheric Overlays */}
        <div className="absolute inset-0 bg-neutral-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/40 to-neutral-950/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/85 via-transparent to-neutral-950/95" />
      </div>

      {/* ─── 2. Editorial Layout Canvas ─── */}
      <div className="relative z-10 mx-auto max-w-[1500px] min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex flex-col justify-between px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-8 sm:pb-10">
        
        {/* Top Meta Row */}
        <div className="flex items-start justify-start md:justify-between w-full">
          {/* Top Left Bracketed Collection Tag (Desktop only) */}
          <div className="hidden md:flex items-center">
            <span className="font-mono text-xs sm:text-sm tracking-[0.22em] text-neutral-300 uppercase">
              [ COLLECTION 001 ]
            </span>
          </div>

          {/* Top Right Architectural Pillar Values (Left on mobile, Right on desktop) */}
          <div className="text-left md:text-right font-mono text-[10px] sm:text-xs tracking-[0.25em] text-neutral-400 uppercase leading-relaxed select-none">
            <div>FORM</div>
            <div>STRUCTURE</div>
            <div>HUMAN</div>
            <div>FUTURE</div>
            <div className="pt-0.5 text-neutral-500 hidden md:block">—</div>
          </div>
        </div>

        {/* Center Title and Manifesto */}
        <div className="my-auto py-8 sm:py-12">
          {/* Massive Brutalist Headline */}
          <h1 className="font-sans font-black uppercase text-white tracking-tight leading-[0.88] select-none text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="block">COLLECTION</span>
            <span className="block mt-1 sm:mt-2">001</span>
          </h1>

          {/* Architectural Manifesto Text */}
          <div className="mt-5 sm:mt-7 max-w-xl">
            <p className="font-mono text-xs sm:text-sm tracking-[0.16em] text-neutral-300 uppercase leading-relaxed">
              Construction led apparel exploring form, structure and a future human context.
            </p>
          </div>
        </div>

        {/* Bottom Sub-Nav & Technical Signature Row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6 w-full pt-5 border-t border-white/15">
          {/* Bottom Left Category Tabs (Swipable on mobile) */}
          <div className="flex items-center gap-5 sm:gap-8 overflow-x-auto no-scrollbar flex-nowrap w-full md:w-auto py-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab)}
                  className={`relative shrink-0 pb-1 font-mono text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-neutral-400 hover:text-neutral-200 font-normal"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-white rounded-full transition-all" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Right Studio Spec (Hidden on mobile) */}
          <div className="hidden md:block text-left sm:text-right font-mono text-[10px] sm:text-xs tracking-[0.22em] text-neutral-400 uppercase leading-snug shrink-0 select-none">
            <div>F3K</div>
            <div>COLLECTION 001</div>
            <div>IN DEVELOPMENT</div>
          </div>
        </div>

      </div>
    </section>
  );
}
