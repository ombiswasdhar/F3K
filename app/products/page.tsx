import { Metadata } from "next";
import { Suspense } from "react";
import F3KNavbar from "@/components/f3k/F3KNavbar";
import F3KFooter from "@/components/f3k/F3KFooter";
import F3KCatalogGrid from "@/components/f3k/F3KCatalogGrid";
import F3KShopHero from "@/components/f3k/F3KShopHero";

export const metadata: Metadata = {
  title: "Collection 001 — Shop All T-Shirts | FUTURE3000 • F3K",
  description: "Construction led apparel exploring form, structure and a future human context. Browse heavyweight luxury streetwear.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-black selection:text-white flex flex-col justify-between">
      {/* Consistent floating pill navigation */}
      <F3KNavbar />

      <main className="flex-1 w-full">
        {/* Architectural Collection 001 Banner */}
        <Suspense fallback={<div className="min-h-[460px] bg-neutral-950 w-full" />}>
          <F3KShopHero />
        </Suspense>

        {/* T-Shirts Catalog Grid */}
        <Suspense fallback={<div className="min-h-[400px] w-full" />}>
          <F3KCatalogGrid />
        </Suspense>
      </main>

      <F3KFooter />
    </div>
  );
}
