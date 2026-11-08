"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Globe } from "lucide-react";

export default function F3KFooter() {
  const [selectedCurrency, setSelectedCurrency] = useState("INR (₹)");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-12 sm:pt-14 pb-28 sm:pb-14 font-sans border-t border-neutral-800">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* Top Assurance Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-10 mb-10 border-b border-neutral-800 text-xs text-neutral-400">
          <div>Free shipping on all orders</div>
          <div className="md:text-center">100% premium combed cotton</div>
          <div className="md:text-right">14-day easy returns & exchanges</div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="pb-1">
              <Image
                src="/logo/f3k-full-white.png"
                alt="F3K FUTURE 3000"
                width={160}
                height={53}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Everyday heavyweight streetwear essentials. Color through construction, not ink.
            </p>
            <p className="text-xs text-neutral-500">
              Exclusively Online • Worldwide Shipping
            </p>
            <div className="pt-1">
              <Link href="/about" className="text-xs font-sans tracking-wider uppercase text-white underline underline-offset-4 hover:text-neutral-300 transition">
                About the Atelier →
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <p className="text-xs font-archivo font-bold uppercase tracking-wider text-white">
              Shop
            </p>
            <ul className="space-y-2 text-xs text-neutral-400 font-dm">
              <li><Link href="/products" className="hover:text-white transition">All 5 Silhouettes</Link></li>
              <li><Link href="/products?category=Heavyweight" className="hover:text-white transition">Heavyweight (ARCH-01)</Link></li>
              <li><Link href="/products?category=Boxy%20Fit" className="hover:text-white transition">Boxy Spliced (SANCTUM)</Link></li>
              <li><Link href="/products?category=Vintage%20Washed" className="hover:text-white transition">Vintage Washed (MONOLITH-01)</Link></li>
              <li><Link href="/products?category=Graphic%20Tees" className="hover:text-white transition">Orbital Signal (CROT-01)</Link></li>
              <li><Link href="/products?category=Minimalist" className="hover:text-white transition">Architectural Drape (BEMUTH-01)</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <p className="text-xs font-archivo font-bold uppercase tracking-wider text-white">
              Customer Care
            </p>
            <ul className="space-y-2 text-xs text-neutral-400 font-dm">
              <li><Link href="/shipping" className="hover:text-white transition">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">Returns & Exchanges</Link></li>
              <li><a href="/#contact" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <p className="text-xs font-archivo font-bold uppercase tracking-wider text-white">
              Legal
            </p>
            <ul className="space-y-2 text-xs text-neutral-400 font-dm">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-dm">
          <div className="flex items-center gap-2">
            <Globe size={14} />
            <div className="flex gap-2">
              {["INR (₹)", "USD ($)", "EUR (€)"].map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => setSelectedCurrency(cur)}
                  className={`px-2 py-0.5 rounded-none font-archivo text-[11px] font-bold transition cursor-pointer ${
                    selectedCurrency === cur
                      ? "bg-white text-black"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Instagram
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              X (Twitter)
            </a>
          </div>

          <div className="flex items-center gap-6">
            <p>© {new Date().getFullYear()} FUTURE3000. All rights reserved.</p>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
