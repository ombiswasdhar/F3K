"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function F3KEditorialManifesto() {
  return (
    <section className="w-full bg-white text-neutral-900 py-16 sm:py-24 border-b border-neutral-300">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* Simple Clean Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-neutral-900">
            Season Lookbook
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-500 font-sans">
            Heavyweight essentials crafted for everyday wear
          </p>
        </div>

        {/* 3 Campaign Cards - 2 side-by-side on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {/* Card 1: Men's */}
          <div className="group relative overflow-hidden rounded-xl bg-neutral-100 aspect-[3/4] flex flex-col justify-end p-3.5 sm:p-6 border border-neutral-200">
            <Image
              src="/models/men_model.jpg"
              alt="F3K Men's Collection"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="relative z-10 text-white">
              <h3 className="text-base sm:text-xl font-bold uppercase tracking-tight">Men</h3>
              <p className="text-[11px] sm:text-xs text-neutral-300 mt-0.5 sm:mt-1 truncate">From ₹7,680</p>
              <Link 
                href="/products?category=T-Shirts" 
                className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium uppercase tracking-wider text-white underline underline-offset-4 hover:text-neutral-200"
              >
                Shop Collection <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Card 2: Lookbook */}
          <div className="group relative overflow-hidden rounded-xl bg-neutral-900 aspect-[3/4] flex flex-col justify-end p-3.5 sm:p-6 border border-neutral-800 text-white">
            <Image
              src="/editorial/f3k_hero_lineup.jpg"
              alt="F3K Campaign Lineup"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover opacity-75 transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="relative z-10">
              <h3 className="text-base sm:text-xl font-bold uppercase tracking-tight">Signature Line</h3>
              <p className="text-[11px] sm:text-xs text-neutral-300 mt-0.5 sm:mt-1 truncate">Wardrobe essentials</p>
              <Link
                href="/products"
                className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium uppercase tracking-wider text-white underline underline-offset-4 hover:text-neutral-200"
              >
                Shop All Items <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Card 3: Women's */}
          <div className="col-span-2 md:col-span-1 group relative overflow-hidden rounded-xl bg-neutral-100 aspect-[16/10] md:aspect-[3/4] flex flex-col justify-end p-4 sm:p-6 border border-neutral-200">
            <Image
              src="/models/women_model.jpg"
              alt="F3K Women's Collection"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="relative z-10 text-white">
              <h3 className="text-base sm:text-xl font-bold uppercase tracking-tight">Women</h3>
              <p className="text-[11px] sm:text-xs text-neutral-300 mt-0.5 sm:mt-1 truncate">From ₹7,680</p>
              <Link 
                href="/products" 
                className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium uppercase tracking-wider text-white underline underline-offset-4 hover:text-neutral-200"
              >
                Shop Collection <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
