"use client";

import React, { useState } from "react";
import { Sliders, RotateCcw, Copy, Check, ChevronDown, ChevronUp, Eye, Move } from "lucide-react";

export type CarouselLayout = {
  x: number;
  y: number;
  angle: number;
  pitch: number;
  scale: number;
};

interface CarouselEditUIProps {
  layout: CarouselLayout;
  onChange: (layout: CarouselLayout) => void;
  onReset: () => void;
  defaultLayout: CarouselLayout;
}

export default function CarouselEditUI({
  layout,
  onChange,
  onReset,
  defaultLayout,
}: CarouselEditUIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateField = (field: keyof CarouselLayout, value: number) => {
    onChange({
      ...layout,
      [field]: value,
    });
  };

  const handleCopy = () => {
    const json = JSON.stringify(layout, null, 2);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToCarousel = () => {
    const el = document.getElementById("hero-carousel");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const controls: Array<{
    key: keyof CarouselLayout;
    label: string;
    min: number;
    max: number;
    step: number;
    unit: string;
  }> = [
      { key: "x", label: "X OFFSET", min: -600, max: 600, step: 1, unit: "px" },
      { key: "y", label: "Y OFFSET", min: -1000, max: 1000, step: 1, unit: "px" },
      { key: "angle", label: "ROTATION", min: -180, max: 180, step: 1, unit: "°" },
      { key: "pitch", label: "3D PITCH", min: -60, max: 60, step: 1, unit: "°" },
      { key: "scale", label: "SCALE", min: 20, max: 600, step: 1, unit: "%" },
    ];

  return (
    <aside
      aria-label="3D Carousel Layout Editor"
      className="hidden md:block fixed bottom-5 right-5 z-[9999] font-sans select-none"
    >
      {/* Minimized Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/90 text-white border border-white/20 shadow-2xl backdrop-blur-md hover:bg-black hover:border-white/40 transition-all text-[11px] tracking-wider uppercase cursor-pointer group"
        >
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <Sliders size={13} className="text-white/80 group-hover:text-white" />
          <span className="font-semibold">Edit Rotating Carousel</span>
        </button>
      )}

      {/* Main Edit Panel */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] rounded-2xl bg-[#0d0d0d]/95 text-white border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <Sliders size={14} className="text-white/80" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-white/90">
                ROTATING THINGIE EDIT UI
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={scrollToCarousel}
                title="Scroll down to carousel section"
                className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded transition cursor-pointer"
              >
                <Eye size={13} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Editor"
                className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded transition cursor-pointer"
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Quick view indicator */}
          <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between text-[10px] text-white/50">
            <span>LIVE VALUES</span>
            <span className="text-white/80">
              x:{layout.x} y:{layout.y} r:{layout.angle}° p:{layout.pitch}° s:{layout.scale}%
            </span>
          </div>

          {/* Sliders Body */}
          <div className="p-4 space-y-3.5 max-h-[60vh] overflow-y-auto">
            {controls.map(({ key, label, min, max, step, unit }) => {
              const val = layout[key];
              return (
                <div key={key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] tracking-wider uppercase">
                    <span className="text-white/70 font-semibold">{label}</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min={min}
                        max={max}
                        step={step}
                        value={val}
                        onChange={(e) => {
                          const num = Number(e.target.value);
                          if (!Number.isNaN(num)) updateField(key, num);
                        }}
                        className="w-14 px-1.5 py-0.5 text-right bg-white/10 border border-white/15 rounded text-[11px] text-emerald-400 font-sans focus:outline-none focus:border-emerald-400"
                      />
                      <span className="text-white/40 text-[9px] w-3">{unit}</span>
                    </div>
                  </div>

                  {/* Range Slider */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateField(key, Math.max(min, val - step))}
                      className="px-1.5 py-0.5 text-[9px] bg-white/5 hover:bg-white/15 rounded text-white/60 hover:text-white"
                    >
                      -
                    </button>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={val}
                      onChange={(e) => updateField(key, Number(e.target.value))}
                      className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-emerald-400 transition"
                    />
                    <button
                      type="button"
                      onClick={() => updateField(key, Math.min(max, val + step))}
                      className="px-1.5 py-0.5 text-[9px] bg-white/5 hover:bg-white/15 rounded text-white/60 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Presets Row */}
          <div className="px-4 py-2 border-t border-white/10 bg-white/[0.02] flex items-center gap-1.5 text-[9px] uppercase tracking-wider overflow-x-auto">
            <span className="text-white/40 text-[8px] mr-1">PRESETS:</span>
            <button
              onClick={() => onChange({ x: -3, y: -500, angle: -20, pitch: -15, scale: 400 })}
              className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-white/80 hover:text-white transition cursor-pointer"
            >
              Default
            </button>
            <button
              onClick={() => onChange({ x: 0, y: 0, angle: 0, pitch: 0, scale: 120 })}
              className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-white/80 hover:text-white transition cursor-pointer"
            >
              Centered
            </button>
            <button
              onClick={() => onChange({ x: 40, y: -30, angle: -28, pitch: -25, scale: 165 })}
              className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-white/80 hover:text-white transition cursor-pointer"
            >
              Dynamic
            </button>
          </div>

          {/* Actions Footer */}
          <div className="p-3 bg-black/60 border-t border-white/10 flex items-center justify-between gap-2 text-[10px]">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition cursor-pointer"
              >
                {copied ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                <span>{copied ? "Copied!" : "Copy JSON"}</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </aside>
  );
}

