"use client";

import React, { useEffect, useState } from "react";

interface F3KSidebarsProps {
  color?: "auto" | "black" | "white";
  desktopOnly?: boolean;
  permanent?: boolean;
}

export default function F3KSidebars({
  color = "auto",
  desktopOnly = false,
  permanent = false,
}: F3KSidebarsProps) {
  const [isPastHero, setIsPastHero] = useState(false);
  const [splitPercent, setSplitPercent] = useState(100);

  useEffect(() => {
    if (permanent) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // A. Slide sidebars out AFTER they visibly cover the sticky filter bar
          // The filter bar docks at sticky top-0 (~60px from top).
          // Tracking rect.top <= 65 ensures the sidebars remain fully visible,
          // covering the left and right edges of the filter bar as it scrolls underneath them,
          // and only slide out into the screen edges once the bar docks at the top.
          const filterBar = document.getElementById("catalog-filter-bar") || document.querySelector(".sticky.top-0");
          if (filterBar) {
            const rect = filterBar.getBoundingClientRect();
            setIsPastHero(rect.top <= 65);
          } else {
            const heroEl = document.getElementById("hero");
            if (heroEl) {
              const rect = heroEl.getBoundingClientRect();
              setIsPastHero(rect.bottom <= 65);
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
  }, [permanent]);

  // Toggle custom hero active scrollbar class
  useEffect(() => {
    if (permanent) return;

    if (!isPastHero) {
      document.documentElement.classList.add("hero-active-scrollbar-hidden");
    } else {
      document.documentElement.classList.remove("hero-active-scrollbar-hidden");
    }
    return () => {
      document.documentElement.classList.remove("hero-active-scrollbar-hidden");
    };
  }, [isPastHero, permanent]);

  const isSolidBlack = color === "black";
  const isSolidWhite = color === "white";

  return (
    <div 
      aria-hidden="true" 
      className={`pointer-events-none fixed inset-y-0 inset-x-0 z-40 items-center justify-between select-none ${
        desktopOnly ? "hidden md:flex" : "flex"
      }`}
    >
      {/* Left Screen Edge */}
      <div 
        className={`h-full flex items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isPastHero && !permanent ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
      >
        <div className="relative h-full w-4 sm:w-6 md:w-8 lg:w-10">
          {isSolidBlack ? (
            <svg 
              viewBox="0 0 50 800" 
              preserveAspectRatio="none" 
              className="absolute inset-0 h-full w-full fill-[#101010] drop-shadow-[0_0_12px_rgba(0,0,0,0.2)]"
            >
              <path d="M0,0 L14,0 L14,320 L43,365 L43,435 L14,480 L14,800 L0,800 Z" />
            </svg>
          ) : isSolidWhite ? (
            <svg 
              viewBox="0 0 50 800" 
              preserveAspectRatio="none" 
              className="absolute inset-0 h-full w-full fill-white drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]"
            >
              <path d="M0,0 L14,0 L14,320 L43,365 L43,435 L14,480 L14,800 L0,800 Z" />
            </svg>
          ) : (
            <>
              {/* White layer for dark background (Hero Part 1) */}
              <svg 
                viewBox="0 0 50 800" 
                preserveAspectRatio="none" 
                className="absolute inset-0 h-full w-full fill-white drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]"
                style={{ clipPath: `inset(0 0 ${100 - splitPercent}% 0)` }}
              >
                <path d="M0,0 L14,0 L14,320 L43,365 L43,435 L14,480 L14,800 L0,800 Z" />
              </svg>
              {/* Dark layer for light background (Hero Part 2) */}
              <svg 
                viewBox="0 0 50 800" 
                preserveAspectRatio="none" 
                className="absolute inset-0 h-full w-full fill-[#101010]"
                style={{ clipPath: `inset(${splitPercent}% 0 0 0)` }}
              >
                <path d="M0,0 L14,0 L14,320 L43,365 L43,435 L14,480 L14,800 L0,800 Z" />
              </svg>
            </>
          )}
        </div>
      </div>

      {/* Right Screen Edge */}
      <div 
        className={`h-full flex items-center justify-end transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isPastHero && !permanent ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
      >
        <div className="relative h-full w-4 sm:w-6 md:w-8 lg:w-10">
          {isSolidBlack ? (
            <svg 
              viewBox="0 0 50 800" 
              preserveAspectRatio="none" 
              className="absolute inset-0 h-full w-full fill-[#101010] scale-x-[-1] drop-shadow-[0_0_12px_rgba(0,0,0,0.2)]"
            >
              <path d="M0,0 L14,0 L14,320 L43,365 L43,435 L14,480 L14,800 L0,800 Z" />
            </svg>
          ) : isSolidWhite ? (
            <svg 
              viewBox="0 0 50 800" 
              preserveAspectRatio="none" 
              className="absolute inset-0 h-full w-full fill-white scale-x-[-1] drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]"
            >
              <path d="M0,0 L14,0 L14,320 L43,365 L43,435 L14,480 L14,800 L0,800 Z" />
            </svg>
          ) : (
            <>
              {/* White layer for dark background */}
              <svg 
                viewBox="0 0 50 800" 
                preserveAspectRatio="none" 
                className="absolute inset-0 h-full w-full fill-white scale-x-[-1] drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]"
                style={{ clipPath: `inset(0 0 ${100 - splitPercent}% 0)` }}
              >
                <path d="M0,0 L14,0 L14,320 L43,365 L43,435 L14,480 L14,800 L0,800 Z" />
              </svg>
              {/* Dark layer for light background */}
              <svg 
                viewBox="0 0 50 800" 
                preserveAspectRatio="none" 
                className="absolute inset-0 h-full w-full fill-[#101010] scale-x-[-1]"
                style={{ clipPath: `inset(${splitPercent}% 0 0 0)` }}
              >
                <path d="M0,0 L14,0 L14,320 L43,365 L43,435 L14,480 L14,800 L0,800 Z" />
              </svg>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
