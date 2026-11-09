"use client";

import React, { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ThreeDPhotoCarousel from "@/components/ui/3d-carousel";
import CarouselEditUI, { type CarouselLayout } from "./CarouselEditUI";

type CarouselAnchorStyle = CSSProperties & { 
  "--carousel-x": string; 
  "--carousel-y": string;
  "--carousel-scale": number;
  "--carousel-desktop-x"?: string;
  "--carousel-desktop-y"?: string;
  "--carousel-desktop-scale"?: number;
};

const defaultDesktopCarouselLayout: CarouselLayout = { x: 0, y: -61, angle: -20, pitch: -15, scale: 153 };
const defaultMobileCarouselLayout: CarouselLayout = { x: -3, y: -500, angle: -20, pitch: -15, scale: 400 };
const gridHorizontalPaths = [1, 5, 10].map((row) => `M0 ${row * 72} H3840`).join(" ");
const gridVerticalPaths = [2, 8, 14].map((column) => `M${column * 72} 0 V2160`).join(" ");

export default function F3KHeroSection() {
  const [carouselLayout, setCarouselLayout] = useState<CarouselLayout>(defaultDesktopCarouselLayout);
  const [heroEmail, setHeroEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // 1. Initial Scroll Reset to top & Responsive Carousel layout storage
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    const isMobile = window.innerWidth < 768;
    const defaultLayout = isMobile ? defaultMobileCarouselLayout : defaultDesktopCarouselLayout;
    const storageKey = isMobile ? "f3k-carousel-layout-mobile-v4" : "f3k-carousel-layout-desktop-v4";

    try {
      const storedLayout = window.localStorage.getItem(storageKey);
      if (storedLayout) {
        const parsed = { ...defaultLayout, ...JSON.parse(storedLayout) } as CarouselLayout;
        if (Object.values(parsed).every((value) => typeof value === "number" && Number.isFinite(value))) {
          setCarouselLayout(parsed);
          return;
        }
      }
    } catch {}

    setCarouselLayout(defaultLayout);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroEmail.trim()) {
      setEmailSubmitted(true);
      setTimeout(() => setEmailSubmitted(false), 4000);
      setHeroEmail("");
    }
  };

  const handleLayoutChange = (newLayout: CarouselLayout) => {
    setCarouselLayout(newLayout);
    try {
      const isMobile = window.innerWidth < 768;
      const storageKey = isMobile ? "f3k-carousel-layout-mobile-v4" : "f3k-carousel-layout-desktop-v4";
      window.localStorage.setItem(storageKey, JSON.stringify(newLayout));
    } catch {}
  };

  const handleLayoutReset = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const defaultLayout = isMobile ? defaultMobileCarouselLayout : defaultDesktopCarouselLayout;
    setCarouselLayout(defaultLayout);
    try {
      const storageKey = isMobile ? "f3k-carousel-layout-mobile-v4" : "f3k-carousel-layout-desktop-v4";
      window.localStorage.setItem(storageKey, JSON.stringify(defaultLayout));
    } catch {}
  };

  return (
    <section id="hero" className="relative w-full overflow-x-clip bg-white text-[#111] selection:bg-black selection:text-white">
      {/* ─── PART 1 OF HERO: CINEMATIC EDITORIAL VISUAL HERO (REFINED TEXTS) ─── */}
      <div className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-black select-none">
        {/* Background Image (Clean 2K High Definition) */}
        <img
          src="/hero/f3k_hero_cinematic_2k.jpg"
          alt="F3K FUTURE3000 — Presence, By Design"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />

        {/* Subtle cinematic gradient vignette for maximum text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

        {/* ================= EDITORIAL OVERLAY CONTAINER ================= */}
        <div className="relative z-10 w-full h-full max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-14 flex flex-col justify-between pt-20 sm:pt-24 pb-24 sm:pb-10 font-mono text-white pointer-events-none">
          
          {/* Top Row: Brand Info (Left) & Atmospheric Details (Right) */}
          <div className="flex items-start justify-between gap-4 sm:gap-6 pointer-events-auto">
            {/* Left: Brand Narrative */}
            <div className="max-w-[180px] sm:max-w-[280px]">
              <p className="text-[9px] sm:text-[11px] leading-[1.45] text-white/80 uppercase tracking-wider font-sans">
                A contemporary atelier exploring form, heavyweight textile physics, and considered silhouette.
              </p>
            </div>

            {/* Right: Technical Specs / Pillars */}
            <div className="text-right space-y-0.5 sm:space-y-1 text-[8.5px] sm:text-[11px] tracking-wider sm:tracking-widest text-white/60 uppercase font-sans shrink-0">
              <p className="text-white font-semibold">CLOTHING —</p>
              <p>500 GSM LOOPBACK</p>
              <p>BESPOKE ARCHITECTURE</p>
              <p className="text-white/40">THE FUTURE &bull; DROP 001</p>
            </div>
          </div>

          {/* Center: "COMING SOON" & "A STUDY IN CONTRASTS" Display */}
          <div className="text-center my-auto py-3 sm:py-8">
            <p className="text-[9px] sm:text-xs tracking-[0.28em] sm:tracking-[0.45em] text-white/60 uppercase mb-2 sm:mb-4 font-sans">
              A STUDY IN CONTRASTS
            </p>
            <h1 className="font-archivo font-extrabold text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.14em] sm:tracking-[0.22em] text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] select-none">
              COMING SOON
            </h1>
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[8px] sm:text-[11px] text-white/50 tracking-[0.18em] sm:tracking-[0.28em] uppercase font-sans">
              <span>EXPLORING FORM</span>
              <span>&bull;</span>
              <span>FUNCTION</span>
              <span>&bull;</span>
              <span>WHAT COMES NEXT</span>
            </div>
          </div>

          {/* Bottom Row: Newsletter / Priority Access (Left) + Geolocation (Right) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-white/15 pointer-events-auto text-[9px] sm:text-[11px]">
            
            {/* Bottom-Left: Priority Access Signup */}
            <div className="space-y-1.5 sm:space-y-2 w-full sm:w-auto">
              <span className="text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase block">
                Be The First To Know
              </span>
              <form onSubmit={handleNewsletterSubmit} className="flex items-center border-b border-white/40 pb-1 max-w-[220px] sm:max-w-[240px]">
                <input
                  type="email"
                  required
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  className="bg-transparent text-[10px] sm:text-[11px] text-white placeholder:text-white/40 outline-none w-full font-sans tracking-wider uppercase"
                />
                <button
                  type="submit"
                  className="text-white/70 hover:text-white transition px-1 cursor-pointer"
                  title="Subscribe"
                >
                  <ArrowRight size={12} />
                </button>
              </form>
              {emailSubmitted && (
                <p className="text-[9px] sm:text-[10px] text-emerald-400 tracking-wider">✓ Registered for Drop 001 priority notification</p>
              )}
              <div className="flex items-center gap-2 text-[8px] sm:text-[9px] text-white/40 tracking-wider uppercase pt-0.5">
                <span>[ LAUNCH ]</span>
                <span>[ COLLECTIONS ]</span>
                <span>[ EXCLUSIVE ACCESS ]</span>
              </div>
            </div>

            {/* Bottom-Right: Geolocation */}
            <div className="text-left sm:text-right space-y-0.5 sm:space-y-1 text-white/60 font-sans text-[8.5px] sm:text-[10px]">
              <p className="text-white/85 tracking-wider font-semibold">MUMBAI &bull; NAGPUR &bull; INDIA</p>
              <p className="text-[8px] sm:text-[9px] text-white/35">&copy; 2026 F3K. ALL RIGHTS RESERVED.</p>
            </div>

          </div>

        </div>
      </div>

      {/* ─── PART 2 OF HERO: 3D ROTATING PHOTO CAROUSEL (RESPONSIVE 2ND-GRID PLACEMENT) ─── */}
      <div id="hero-carousel" className="relative min-h-[100svh] overflow-hidden bg-white text-[#171717] pt-2 sm:pt-12 flex flex-col justify-between">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 f3k-grid-backdrop">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="f3k-connected-dot-grid" width="72" height="72" patternUnits="userSpaceOnUse">
                <path d="M72 0H0V72" fill="none" stroke="#101820" strokeOpacity="0.11" strokeWidth="0.75" />
                <circle cx="0" cy="0" r="1.35" fill="#101820" fillOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#f3k-connected-dot-grid)" />
            <path d={gridHorizontalPaths} className="f3k-grid-glow f3k-grid-glow-horizontal" />
            <path d={gridVerticalPaths} className="f3k-grid-glow f3k-grid-glow-vertical" />
          </svg>
        </div>

        <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[40%] sm:top-[33%] z-[1] h-[clamp(5rem,20vw,26rem)] sm:h-[clamp(7rem,24vw,26rem)] w-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <text x="10" y="240" textLength="1180" lengthAdjust="spacingAndGlyphs" fill="currentColor" fillOpacity="0.16" fontFamily="Archivo, sans-serif" fontSize="250" fontWeight="700">future3k</text>
        </svg>

        {/* Content Container - Aligned to 2nd grid (72px) from edges on desktop & tablet, responsive on mobile */}
        <div className="relative z-10 w-full px-5 sm:px-8 md:px-[72px] mt-2 sm:mt-[7vh] flex min-h-0 sm:min-h-[720px] lg:min-h-[72vh] flex-col text-[#101010]">
          {/* Top Bar: Starts in 2nd grid on left, ends in 2nd grid on right */}
          <div className="flex items-center justify-between gap-4 pt-14 sm:pt-6 text-[9px] sm:text-[10px] lg:text-[11px] font-sans tracking-wider font-medium">
            <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-black" /> AVAILABLE NOW</span>
            <span className="hidden sm:block text-neutral-500 tracking-[0.2em]">FUTURE3000 — DROP 001</span>
            <Link href="/products" className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-black transition">
              <span>Shop the drop</span> 
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Main Stage Grid: Left column placed in 2nd grid on desktop, carousel on top and text below on mobile */}
          <div className="relative flex flex-col md:grid flex-1 md:grid-cols-[0.31fr_0.69fr] items-center gap-3 pb-6 sm:pb-16 pt-2 md:gap-0">
            {/* 3D Rotating Photo Carousel (order-1 on mobile, order-2 on desktop) */}
            <div
              className="f3k-carousel-layout-anchor order-1 md:order-2 relative min-w-0 self-center overflow-visible md:absolute md:z-0 md:w-[90%] md:max-w-[1000px] md:-translate-x-1/2 md:-translate-y-1/2"
              style={{ 
                "--carousel-x": `${carouselLayout.x}px`, 
                "--carousel-y": `${carouselLayout.y}px`,
                "--carousel-scale": carouselLayout.scale,
                "--carousel-desktop-x": `${carouselLayout.x}px`,
                "--carousel-desktop-y": `${carouselLayout.y}px`,
                "--carousel-desktop-scale": carouselLayout.scale,
              } as CarouselAnchorStyle}
            >
              <div 
                className="f3k-carousel-rotator relative overflow-visible" 
                style={{ rotate: `${carouselLayout.angle}deg` }}
              >
                <ThreeDPhotoCarousel pitch={carouselLayout.pitch} />
              </div>
            </div>

            {/* Stage Text (order-2 on mobile placed below the carousel, order-1 on desktop) */}
            <div className="relative z-10 w-full max-w-none md:max-w-[240px] pt-1 pb-2 sm:py-0 select-none order-2 md:order-1 translate-y-[72px] md:translate-y-0">
              <p className="mt-2 sm:mt-5 text-[11px] sm:text-[11px] lg:text-[12px] leading-[1.4] sm:leading-[1.5] lg:leading-[1.6] tracking-wider lg:tracking-widest font-archivo uppercase text-neutral-900 font-semibold">
                <span className="sm:hidden">Streetwear &bull; Tees &bull; Hoodies &bull; Accessories</span>
                <span className="hidden sm:inline">Streetwear<br />Tees<br />Hoodies<br />Accessories</span>
              </p>
              <p className="mt-1.5 sm:mt-8 text-[10px] sm:text-[11px] lg:text-xs leading-relaxed text-neutral-600 w-full max-w-none md:max-w-[215px] font-sans">
                Built for presence. Heavyweight essentials and considered silhouettes for the everyday.
              </p>
            </div>
          </div>

        </div>

        {/* Footer: Starts in 2nd grid on left, ends in 2nd grid on right */}
        <footer className="relative z-10 w-full px-5 sm:px-8 md:px-[72px] pb-24 sm:pb-24 lg:pb-24 pt-4 sm:pt-8 flex items-end justify-between gap-6 text-[9.5px] sm:text-[11px] lg:text-[12px] font-sans leading-[1.35] lg:leading-[1.45]">
          <p>F3K Atelier<br />Clothes built for the room.</p>
          <p className="text-right">© FUTURE3000<br />All rights reserved.</p>
        </footer>
      </div>

      {/* 4. RUNNING MARQUEE TICKER TAPE (Full width black strip, pulled up 1 grid block: 72px) */}
      <div className="relative z-20 w-full bg-[#000000] border-y border-white/[0.12] py-2.5 overflow-hidden -mt-[72px]">
        <div className="flex whitespace-nowrap animate-marquee font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-normal text-white/55">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-6 mx-3">
              <span>BLACK FRIDAY SALE</span>
              <span className="text-white/40">•</span>
              <span className="text-white/55">UP TO 65% OFF</span>
              <span className="text-white/40">•</span>
              <span>SHOP BLACK FRIDAY SALE</span>
              <span className="text-white/40">•</span>
              <span className="text-white/55">F3K ATELIER</span>
              <span className="text-white/40">•</span>
              <span>OWN THE ROOM</span>
              <span className="text-white/40">•</span>
            </span>
          ))}
        </div>
      </div>
      {/* 5. 3D ROTATING THINGIE EDIT UI */}
      <CarouselEditUI
        layout={carouselLayout}
        onChange={handleLayoutChange}
        onReset={handleLayoutReset}
        defaultLayout={typeof window !== "undefined" && window.innerWidth < 768 ? defaultMobileCarouselLayout : defaultDesktopCarouselLayout}
      />
    </section>
  );
}
