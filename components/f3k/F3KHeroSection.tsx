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
};

const defaultCarouselLayout: CarouselLayout = { x: 0, y: -61, angle: -20, pitch: -15, scale: 153 };
const carouselLayoutStorageKey = "f3k-carousel-layout-v2";
const gridHorizontalPaths = [1, 5, 10].map((row) => `M0 ${row * 72} H3840`).join(" ");
const gridVerticalPaths = [2, 8, 14].map((column) => `M${column * 72} 0 V2160`).join(" ");

export default function F3KHeroSection() {
  const [carouselLayout, setCarouselLayout] = useState<CarouselLayout>(defaultCarouselLayout);
  const [isPastHero, setIsPastHero] = useState(false);
  const [splitPercent, setSplitPercent] = useState(100);
  const [heroEmail, setHeroEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // 1. Initial Scroll Reset to top & Carousel layout storage
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    try {
      const storedLayout = window.localStorage.getItem(carouselLayoutStorageKey);
      if (!storedLayout) return;

      const parsed = { ...defaultCarouselLayout, ...JSON.parse(storedLayout) } as CarouselLayout;
      if (Object.values(parsed).every((value) => typeof value === "number" && Number.isFinite(value))) {
        setCarouselLayout(parsed);
      }
    } catch {}
  }, []);

  // 2. Scroll Detection: Real-time background reactivity (Light on dark hero, Dark on light carousel) + Slide out on catalog
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // A. Slide sidebars out as t-shirt lineup begins
          const catalogEl = document.getElementById("catalog") || document.getElementById("products");
          if (catalogEl) {
            const rect = catalogEl.getBoundingClientRect();
            setIsPastHero(rect.top <= 140);
          } else {
            const heroEl = document.getElementById("hero");
            if (heroEl) {
              const rect = heroEl.getBoundingClientRect();
              setIsPastHero(rect.bottom <= 140);
            }
          }

          // B. Track boundary between Hero 1 (dark background) and Hero 2 (light carousel background)
          const carouselEl = document.getElementById("hero-carousel");
          if (carouselEl) {
            const rect = carouselEl.getBoundingClientRect();
            const h = window.innerHeight || 1;
            const pct = Math.max(0, Math.min(100, (rect.top / h) * 100));
            setSplitPercent(pct);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // 3. Toggle Scrollbar on HTML document
  useEffect(() => {
    if (!isPastHero) {
      document.documentElement.classList.add("hero-active-scrollbar-hidden");
    } else {
      document.documentElement.classList.remove("hero-active-scrollbar-hidden");
    }
    return () => {
      document.documentElement.classList.remove("hero-active-scrollbar-hidden");
    };
  }, [isPastHero]);

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
      window.localStorage.setItem(carouselLayoutStorageKey, JSON.stringify(newLayout));
    } catch {}
  };

  const handleLayoutReset = () => {
    setCarouselLayout(defaultCarouselLayout);
    try {
      window.localStorage.setItem(carouselLayoutStorageKey, JSON.stringify(defaultCarouselLayout));
    } catch {}
  };

  return (
    <section id="hero" className="relative w-full overflow-x-clip bg-white text-[#111] selection:bg-black selection:text-white">
      
      {/* ─── REACTIVE FIXED SIDEBARS: PURE CONTRAST REACTIVE (LIGHT ON DARK, DARK ON LIGHT) ─── */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-y-0 inset-x-0 z-30 flex items-center justify-between"
      >
        {/* Left Screen Edge: Reactive Dual-Layer Split (Pure White on Dark, Pure Black on Light) */}
        <div 
          className={`h-full flex items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isPastHero ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          <div className="relative h-full w-4 sm:w-6 md:w-8 lg:w-10">
            {/* White layer for dark background (Hero Part 1) */}
            <svg 
              viewBox="0 0 50 800" 
              preserveAspectRatio="none" 
              className="absolute inset-0 h-full w-full fill-white drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]"
              style={{ clipPath: `inset(0 0 ${100 - splitPercent}% 0)` }}
            >
              {/* Original vertical span (y=320 to 480) with extrusion depth reduced by 30% (x=43 instead of 56) */}
              <path d="M0,0 L14,0 L14,320 L43,365 L43,435 L14,480 L14,800 L0,800 Z" />
            </svg>
            {/* Dark layer for light background (Hero Part 2) */}
            <svg 
              viewBox="0 0 50 800" 
              preserveAspectRatio="none" 
              className="absolute inset-0 h-full w-full fill-[#101010]"
              style={{ clipPath: `inset(${splitPercent}% 0 0 0)` }}
            >
              {/* Original vertical span with 30% reduced extrusion */}
              <path d="M0,0 L14,0 L14,320 L43,365 L43,435 L14,480 L14,800 L0,800 Z" />
            </svg>
          </div>
        </div>

        {/* Right Screen Edge: Mirrored Reactive Dual-Layer Split */}
        <div 
          className={`h-full flex items-center justify-end transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isPastHero ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          <div className="relative h-full w-4 sm:w-6 md:w-8 lg:w-10">
            {/* White layer for dark background */}
            <svg 
              viewBox="0 0 50 800" 
              preserveAspectRatio="none" 
              className="absolute inset-0 h-full w-full fill-white scale-x-[-1] drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]"
              style={{ clipPath: `inset(0 0 ${100 - splitPercent}% 0)` }}
            >
              {/* Mirrored original vertical span with 30% reduced extrusion */}
              <path d="M0,0 L14,0 L14,320 L43,365 L43,435 L14,480 L14,800 L0,800 Z" />
            </svg>
            {/* Dark layer for light background */}
            <svg 
              viewBox="0 0 50 800" 
              preserveAspectRatio="none" 
              className="absolute inset-0 h-full w-full fill-[#101010] scale-x-[-1]"
              style={{ clipPath: `inset(${splitPercent}% 0 0 0)` }}
            >
              {/* Mirrored original vertical span with 30% reduced extrusion */}
              <path d="M0,0 L14,0 L14,320 L43,365 L43,435 L14,480 L14,800 L0,800 Z" />
            </svg>
          </div>
        </div>
      </div>

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

          {/* Main Stage Grid: Left column placed in 2nd grid, away from rotating carousel */}
          <div className="relative grid flex-1 grid-cols-1 items-center gap-2 pb-6 sm:pb-16 pt-2 md:grid-cols-[0.31fr_0.69fr] md:gap-0">
            <div className="relative z-10 max-w-[260px] lg:max-w-[240px] pt-1 pb-2 sm:py-0 select-none">
              <p className="mt-2 sm:mt-5 text-[10px] sm:text-[11px] lg:text-[12px] leading-[1.4] sm:leading-[1.5] lg:leading-[1.6] tracking-wider lg:tracking-widest font-archivo uppercase text-neutral-900 font-semibold">
                Streetwear<br />Tees<br />Hoodies<br />Accessories
              </p>
              <p className="mt-2 sm:mt-8 text-[9.5px] sm:text-[11px] lg:text-xs leading-[1.4] sm:leading-[1.45] lg:leading-[1.55] text-neutral-600 max-w-[220px] sm:max-w-[205px] lg:max-w-[215px] font-sans">
                Built for presence. Heavyweight essentials and considered silhouettes for the everyday.
              </p>
            </div>

            <div
              className="f3k-carousel-layout-anchor relative min-w-0 self-center overflow-visible md:absolute md:z-0 md:w-[90%] md:max-w-[1000px] md:-translate-x-1/2 md:-translate-y-1/2"
              style={{ 
                "--carousel-x": `${carouselLayout.x}px`, 
                "--carousel-y": `${carouselLayout.y}px`,
                "--carousel-scale": carouselLayout.scale,
              } as CarouselAnchorStyle}
            >
              <div 
                className="f3k-carousel-rotator relative overflow-visible" 
                style={{ rotate: `${carouselLayout.angle}deg` }}
              >
                <ThreeDPhotoCarousel pitch={carouselLayout.pitch} />
              </div>
            </div>
          </div>

        </div>

        {/* Footer: Starts in 2nd grid on left, ends in 2nd grid on right */}
        <footer className="relative z-10 w-full px-5 sm:px-8 md:px-[72px] pb-28 sm:pb-7 lg:pb-8 pt-4 sm:pt-8 flex items-end justify-between gap-6 text-[9.5px] sm:text-[11px] lg:text-[12px] font-sans leading-[1.35] lg:leading-[1.45]">
          <p>F3K Atelier<br />Clothes built for the room.</p>
          <p className="text-right">© FUTURE3000<br />All rights reserved.</p>
        </footer>
      </div>

      {/* 4. RUNNING MARQUEE TICKER TAPE (Full width black strip) */}
      <div className="relative z-20 w-full bg-[#000000] border-y border-white/[0.12] py-2.5 overflow-hidden">
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
        defaultLayout={defaultCarouselLayout}
      />
    </section>
  );
}
