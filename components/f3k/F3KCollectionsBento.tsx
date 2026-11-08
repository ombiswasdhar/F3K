"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BentoCategory {
  title: string;
  subtitle: string;
  itemCount: string;
  image: string;
  href: string;
}

const collections: BentoCategory[] = [
  {
    title: "ARCH-01 Panel Tee",
    subtitle: "Engineered curved panel seams & spine typography",
    itemCount: "Silhouette 01 • 280 GSM",
    image: "/products/f3k/ARCH-01/front.png",
    href: "/products/arch-01-panel-tee",
  },
  {
    title: "SANCTUM Spliced Tee",
    subtitle: "Cut-and-sew piecework with zero surface ink",
    itemCount: "Silhouette 02 • 290 GSM",
    image: "/products/f3k/SANCTUM/front.png",
    href: "/products/sanctum-spliced-tee",
  },
  {
    title: "MONOLITH-01 Stonewashed",
    subtitle: "Mineral stonewashed finish with rear technical framing",
    itemCount: "Silhouette 03 • 280 GSM",
    image: "/products/f3k/MONOLITH 01/front.png",
    href: "/products/monolith-01-stonewashed-tee",
  },
];

export default function F3KCollectionsBento() {
  return (
    <section id="collections" className="w-full bg-[#fafafa] text-neutral-900 py-12 sm:py-24 border-b border-neutral-300">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-neutral-300">
          <div>
            <h2 className="font-sans font-bold text-2xl sm:text-5xl uppercase tracking-tight text-neutral-900">
              Featured Silhouettes
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-500 font-sans">
              Drop 001 • 5 Architectural Garments
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition"
          >
            View All 5 Silhouettes →
          </Link>
        </div>

        {/* 3-Column Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {collections.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-none bg-white border border-neutral-300 p-5 sm:p-8 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] lg:min-h-[440px] transition-all duration-300 hover:shadow-lg hover:border-neutral-900"
            >
              {/* Product Image */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-100/70">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              </div>

              {/* Top Header inside Card */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="bg-white/95 backdrop-blur-md text-neutral-900 px-3 py-1 rounded-none text-xs font-semibold shadow-xs">
                  {item.itemCount}
                </span>
                <div className="size-9 rounded-none bg-white text-black grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md transform translate-x-1 group-hover:translate-x-0">
                  <ArrowRight size={15} />
                </div>
              </div>

              {/* Bottom Information */}
              <div className="relative z-10 text-white">
                <p className="text-xs text-neutral-300 font-sans tracking-wide">
                  {item.subtitle}
                </p>
                <h3 className="font-sans font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
                  {item.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-neutral-200 font-medium underline underline-offset-4 group-hover:text-white transition">
                  Explore Silhouette →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
