"use client"

import Image from "next/image"
import { useState } from "react"
import { AnimatePresence, motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { useMediaQuery } from "@/components/ui/3d-carousel"

const clothing = [
  { name: "ARCH-01 Panel Tee", detail: "01 • 280 GSM Combed Cotton", image: "/products/f3k/ARCH-01/front.png" },
  { name: "SANCTUM Spliced Tee", detail: "02 • 290 GSM Cut & Sew", image: "/products/f3k/SANCTUM/front.png" },
  { name: "MONOLITH-01 Stonewashed Tee", detail: "03 • 280 GSM Mineral Wash", image: "/products/f3k/MONOLITH 01/front.png" },
  { name: "CROT-01 Orbital Signal Tee", detail: "04 • 280 GSM Combed Jersey", image: "/products/f3k/CROT 01/front.png" },
  { name: "BEMUTH-01 Architectural Tee", detail: "05 • 270 GSM Compact Cotton", image: "/products/f3k/BEMUTH 01/front.png" },
]

function ClothingCylinder({
  active,
  controls,
  onSelect,
}: {
  active: boolean
  controls: ReturnType<typeof useAnimation>
  onSelect: (index: number) => void
}) {
  const isSmall = useMediaQuery("(max-width: 640px)")
  const cylinderWidth = isSmall ? 1050 : 1680
  const faceCount = clothing.length
  const faceWidth = cylinderWidth / faceCount
  const radius = cylinderWidth / (2 * Math.PI)
  const rotation = useMotionValue(0)
  const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`)

  return (
    <div className="flex h-full items-center justify-center" style={{ perspective: "1100px", transformStyle: "preserve-3d" }}>
      <motion.div
        drag={active ? "x" : false}
        dragElastic={0.08}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{ transform, rotateY: rotation, width: cylinderWidth, transformStyle: "preserve-3d" }}
        onDrag={(_, info) => active && rotation.set(rotation.get() + info.delta.x * 0.14)}
        onDragEnd={(_, info) => active && controls.start({
          rotateY: rotation.get() + info.velocity.x * 0.08,
          transition: { type: "spring", stiffness: 90, damping: 24, mass: 0.2 },
        })}
        animate={controls}
      >
        {clothing.map((item, index) => (
          <motion.button
            key={item.image}
            type="button"
            aria-label={`View ${item.name}`}
            className="absolute flex h-full origin-center items-center justify-center p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-black"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${index * (360 / faceCount)}deg) translateZ(${radius}px)`,
              backfaceVisibility: "hidden",
            }}
            onClick={() => onSelect(index)}
          >
            <span className="relative block h-full w-full overflow-hidden rounded-none bg-[#e8e6e1] text-black shadow-[0_18px_60px_rgba(0,0,0,.16)]">
              <span className="absolute inset-x-0 top-0 z-10 flex justify-between p-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/50">
                <span>F3K • 00{index + 1}</span>
                <span>VIEW ↗</span>
              </span>
              <span className="absolute inset-x-3 top-9 bottom-[62px]">
                <Image src={item.image} alt={item.name} fill priority={index === 0} sizes="(max-width: 640px) 150px, 240px" className="object-contain mix-blend-multiply transition-transform duration-500 hover:scale-[1.04]" />
              </span>
              <span className="absolute inset-x-3 bottom-3 border-t border-black/15 pt-2">
                <span className="block truncate text-[11px] font-bold uppercase tracking-wide">{item.name}</span>
                <span className="mt-1 block truncate text-[9px] uppercase tracking-[0.16em] text-black/45">{item.detail}</span>
              </span>
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export default function F3KClothingCarousel({ embedded = false }: { embedded?: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const controls = useAnimation()
  const selected = selectedIndex === null ? null : clothing[selectedIndex]

  const openProduct = (index: number) => {
    setSelectedIndex(index)
    controls.stop()
  }

  return (
    <section aria-label="Interactive F3K clothing carousel" className={`relative overflow-hidden text-[#111] ${embedded ? "w-full bg-transparent py-0" : "bg-[#f2f1ed] py-14 sm:py-20"}`}>
      {!embedded && (
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-5 border-b border-black/15 pb-5 sm:pb-7">
            <div>
              <p className="mb-2 text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-black/55">F3K • OBJECTS IN MOTION</p>
              <h2 className="font-archivo font-extrabold text-4xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl text-neutral-900">
                The collection
              </h2>
            </div>
            <p className="hidden max-w-[190px] text-right text-[10px] font-sans uppercase leading-relaxed tracking-[0.13em] text-black/55 sm:block">
              Drag to rotate<br />Select a piece to inspect
            </p>
          </div>
        </div>
      )}

      <div className={`relative w-full overflow-hidden ${embedded ? "h-[350px] sm:h-[460px]" : "mt-3 h-[370px] sm:mt-7 sm:h-[500px]"}`}>
        <div className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-r ${embedded ? "from-white via-transparent to-white" : "from-[#f2f1ed] via-transparent to-[#f2f1ed]"}`} />
        <ClothingCylinder active={selectedIndex === null} controls={controls} onSelect={openProduct} />
      </div>

      {!embedded && (
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 text-[9px] font-sans font-semibold uppercase tracking-[0.18em] text-black/45 sm:px-8 lg:px-12">
          <span>Drop 001 • F3K Studio</span>
          <span className="sm:hidden">Drag to rotate · Tap to view</span>
          <span className="hidden sm:inline">Five silhouettes • Drop 001</span>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.button
            type="button"
            aria-label="Close product preview"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.span
              layoutId={`clothing-preview-${selected.image}`}
              className="relative block aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-none bg-[#e8e6e1] p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <span className="absolute inset-x-5 top-5 flex justify-between text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                <span>F3K • {String(selectedIndex! + 1).padStart(2, "0")}</span>
                <span>Drop 001</span>
              </span>
              <Image src={selected.image} alt={selected.name} fill sizes="(max-width: 640px) 90vw, 440px" className="object-contain p-8 mix-blend-multiply" />
              <span className="absolute inset-x-5 bottom-5 border-t border-black/15 pt-3 text-left">
                <span className="block text-sm font-bold uppercase tracking-wide">{selected.name}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-black/45">{selected.detail}</span>
              </span>
              <span className="absolute bottom-5 right-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">Tap to close</span>
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
}
