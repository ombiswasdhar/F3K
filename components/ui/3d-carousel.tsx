"use client"

import { memo, useEffect, useLayoutEffect, useState } from "react"
import { motion, useAnimationFrame, useMotionValue } from "framer-motion"

export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = { defaultValue?: boolean; initializeWithValue?: boolean }
const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(query: string, { defaultValue = false, initializeWithValue = false }: UseMediaQueryOptions = {}): boolean {
  const getMatches = (query: string): boolean => { if (IS_SERVER) return defaultValue; return window.matchMedia(query).matches }
  const [matches, setMatches] = useState<boolean>(() => (initializeWithValue ? getMatches(query) : defaultValue))
  const handleChange = () => setMatches(getMatches(query))
  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query); handleChange()
    matchMedia.addEventListener("change", handleChange)
    return () => matchMedia.removeEventListener("change", handleChange)
  }, [query])
  return matches
}

const clothingImages = [
  "/products/f3k/ARCH-01/front.png",
  "/products/f3k/ARCH-01/back.png",
  "/products/f3k/SANCTUM/front.png",
  "/products/f3k/SANCTUM/back.png",
  "/products/f3k/MONOLITH 01/front.png",
  "/products/f3k/MONOLITH 01/back.png",
  "/products/f3k/CROT 01/front.png",
  "/products/f3k/CROT 01/back.png",
  "/products/f3k/BEMUTH 01/front.png",
  "/products/f3k/BEMUTH 01/back.png",
]

const Carousel = memo(({ cards, pitch, scale = 400 }: { cards: string[]; pitch: number; scale?: number }) => {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)")

  // Native geometry scale calculation:
  // Instead of stretching a small 2D canvas with CSS scale(3.2x - 4x) which causes severe blur & pixelation,
  // we compute the 3D cylinder width, card face width, and radius directly at full retina resolution.
  const scaleMultiplier = isScreenSizeSm ? (scale * 0.008) : (scale * 0.01)
  const effectiveScale = Math.max(0.5, scaleMultiplier || 1)

  const baseCylinder = isScreenSizeSm ? 820 : 1800
  const cylinderWidth = baseCylinder * effectiveScale
  const faceCount = cards.length
  const faceWidth = cylinderWidth / faceCount
  const radius = cylinderWidth / (2 * Math.PI)
  const perspective = (isScreenSizeSm ? 1000 : 1200) * effectiveScale

  const rotation = useMotionValue(0)
  useAnimationFrame((_, delta) => rotation.set(rotation.get() + delta * 0.003))

  return (
    <div 
      className="flex h-full items-center justify-center overflow-visible" 
      style={{ 
        perspective: `${perspective}px`, 
        transformStyle: "preserve-3d" 
      }}
    >
      <motion.div 
        drag="x" 
        dragConstraints={{ left: 0, right: 0 }} 
        dragElastic={0} 
        dragMomentum={false} 
        className="relative flex h-full origin-center cursor-default justify-center overflow-visible" 
        style={{ 
          rotateX: pitch, 
          rotateY: rotation, 
          width: `${cylinderWidth}px`, 
          transformStyle: "preserve-3d" 
        }}
        onDrag={(_, info) => rotation.set(rotation.get() + info.delta.x * 0.14)}
      >
        {cards.map((imgUrl, i) => (
          <div 
            key={`key-${imgUrl}-${i}`} 
            className="absolute flex h-full origin-center items-center justify-center p-2" 
            style={{ 
              width: `${faceWidth}px`, 
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Ultra-crisp t-shirt graphic: rendered directly from source at native high resolution */}
            <img 
              src={imgUrl} 
              alt={`FUTURE3000 clothing item ${i + 1}`} 
              className="pointer-events-none aspect-square w-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.14)]" 
              style={{
                imageRendering: "auto",
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)"
              }}
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
})

function ThreeDPhotoCarousel({ pitch = 0, scale = 400 }: { pitch?: number; scale?: number }) {
  const cards = clothingImages

  return (
    <div className="relative overflow-visible">
      <div className="relative h-[320px] sm:h-[500px] w-full overflow-visible">
        <div aria-hidden="true" className="pointer-events-none absolute bottom-12 sm:bottom-24 left-1/2 z-0 h-8 w-[68%] -translate-x-1/2 rounded-[50%] bg-black/20 blur-2xl" />
        <div className="relative z-10 h-full overflow-visible">
          <Carousel cards={cards} pitch={pitch} scale={scale} />
        </div>
      </div>
    </div>
  )
}

export { ThreeDPhotoCarousel }
export default ThreeDPhotoCarousel
