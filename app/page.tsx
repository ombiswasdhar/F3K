"use client";

import { Suspense } from "react";
import F3KNavbar from "@/components/f3k/F3KNavbar";
import F3KHeroSection from "@/components/f3k/F3KHeroSection";
import F3KSidebars from "@/components/f3k/F3KSidebars";
import F3KCatalogGrid from "@/components/f3k/F3KCatalogGrid";
import F3KEditorialManifesto from "@/components/f3k/F3KEditorialManifesto";
import F3KCollectionsBento from "@/components/f3k/F3KCollectionsBento";
import F3KAtelierStore from "@/components/f3k/F3KAtelierStore";
import F3KDropAccess from "@/components/f3k/F3KDropAccess";
import F3KFooter from "@/components/f3k/F3KFooter";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col font-main bg-white text-[#111] selection:bg-black selection:text-white">
      {/* Invisible fixed top navigation bar that stays stuck in its place */}
      <F3KNavbar />

      {/* 1. First Part: Luxury Editorial Lineup & Quick Shop (Hero section UNTOUCHED) */}
      <F3KHeroSection />

      <main className="flex-1 w-full overflow-hidden">
        {/* 2. Catalog Grid: Hairline border tabular inventory with live filters, size selection, and cart actions (GOAT & Skot reference) */}
        <Suspense fallback={null}>
          <F3KCatalogGrid />
        </Suspense>

        {/* 3. Editorial Campaign: High-impact streetwear attitude, model triptych, and true fabric specs (Zerouge & Puma Futurist reference) */}
        <F3KEditorialManifesto />

        {/* 4. Collections Bento: Visual category mosaic for hoodies, tees, headwear, bottoms, and tactical bags (Jolt reference) */}
        <F3KCollectionsBento />

        {/* 5. Customer Care & Contact Us Box: Direct inquiries, support channels, and order help */}
        <F3KAtelierStore />

        {/* 6. Drop 002 Priority Access: Genuine streetwear drop list and SMS notification */}
        <F3KDropAccess />
      </main>

      {/* Reactive Fixed Sidebars (Rendered at root after <main> so they visibly cover sticky bars) */}
      <F3KSidebars />

      {/* 7. Atelier Footer: Full customer care, shipping & returns, sizing guide, currency switcher, and socials */}
      <F3KFooter />
    </div>
  );
}
