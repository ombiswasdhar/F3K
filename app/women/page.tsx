import { Metadata } from "next";
import { Suspense } from "react";
import F3KNavbar from "@/components/f3k/F3KNavbar";
import F3KFooter from "@/components/f3k/F3KFooter";
import F3KCatalogGrid from "@/components/f3k/F3KCatalogGrid";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Women's Collection — FUTURE3000 • F3K",
  description: "Heavyweight streetwear essentials, cropped boxy cuts, hoodies, and accessories engineered for women.",
};

export default function WomenPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-black selection:text-white flex flex-col justify-between">
      <F3KNavbar />

      <main className="flex-1 w-full pt-20 sm:pt-24">
        {/* Editorial Banner */}
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 mb-8">
          <div className="relative rounded-2xl overflow-hidden bg-neutral-900 h-64 sm:h-80 flex items-end p-6 sm:p-10 border border-neutral-300">
            <Image
              src="/models/women_model.jpg"
              alt="Women's Collection"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="relative z-10 text-white">
              <span className="text-xs font-sans uppercase tracking-widest text-neutral-300">Women</span>
              <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">
                Women's Collection
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-md">
                Structured streetwear, cropped fleece, and oversized unisex staples.
              </p>
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        <Suspense fallback={null}>
          <F3KCatalogGrid />
        </Suspense>
      </main>

      <F3KFooter />
    </div>
  );
}
