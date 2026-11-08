"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "@clerk/nextjs";

interface DripegoLoaderProps {
  isTransition?: boolean;
}

export default function DripegoLoader({ isTransition = false }: DripegoLoaderProps) {
  const session = useSession();
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Scroll locking for initial load
  useEffect(() => {
    if (!isTransition && isMounted) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (!isTransition) {
        document.body.style.overflow = "";
      }
    };
  }, [isTransition, isMounted]);

  // Readiness detection for initial load
  useEffect(() => {
    if (isTransition) return;

    let checkInterval: NodeJS.Timeout;
    let isDone = false;

    const checkReadiness = () => {
      if (isDone) return;

      const windowLoaded = typeof window !== "undefined" && document.readyState === "complete";
      const clerkLoaded = session?.isLoaded ?? true;

      if (windowLoaded && clerkLoaded) {
        isDone = true;
        setIsReady(true);
        clearInterval(checkInterval);
      }
    };

    checkReadiness();

    if (!isDone) {
      if (typeof window !== "undefined") {
        window.addEventListener("load", checkReadiness);
      }
      checkInterval = setInterval(checkReadiness, 100);
    }

    // Safety fallback timeout: Loader must never get permanently stuck
    const fallbackTimer = setTimeout(() => {
      if (!isDone) {
        console.warn("[DripegoLoader] Safety fallback triggered.");
        isDone = true;
        setIsReady(true);
        clearInterval(checkInterval);
      }
    }, 4500); // 4.5 seconds fallback

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", checkReadiness);
      }
      clearInterval(checkInterval);
      clearTimeout(fallbackTimer);
    };
  }, [session, isTransition]);

  // Trigger exit animation sequence
  useEffect(() => {
    if (isReady && !isTransition) {
      setIsAnimatingOut(true);
      const exitTimer = setTimeout(() => {
        setIsMounted(false);
        document.body.style.overflow = "";
      }, 700); // Duration matches the transition-all 700ms below
      return () => clearTimeout(exitTimer);
    }
  }, [isReady, isTransition]);

  if (!isMounted && !isTransition) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white text-neutral-900 transition-all duration-700 ease-out select-none pointer-events-auto ${
        isAnimatingOut ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes f3kLoaderSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>

      <div className="flex flex-col items-center text-center px-4">
        {/* Atelier Eyebrow */}
        <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase select-none mb-2">
          [ ATELIER CALIBRATION ]
        </span>

        {/* F3K Main Bold Brand Mark Lockup */}
        <div className="py-2 select-none">
          <Image
            src="/logo/f3k-full-black.png"
            alt="F3K FUTURE 3000"
            width={320}
            height={107}
            priority
            className="h-16 sm:h-20 w-auto object-contain select-none"
          />
        </div>

        {/* Minimalist Hairline Progress Bar */}
        <div className="relative mt-8 h-[2px] w-[220px] sm:w-[280px] overflow-hidden bg-neutral-200 rounded-full">
          <div 
            className="absolute top-0 bottom-0 w-1/3 bg-black rounded-full" 
            style={{ animation: "f3kLoaderSlide 1.3s cubic-bezier(0.65, 0, 0.35, 1) infinite" }}
          />
        </div>

        {/* Technical Status Footer */}
        <span className="mt-3 font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
          INITIALIZING TEXTILE ARCHITECTURE
        </span>
      </div>
    </div>
  );
}
