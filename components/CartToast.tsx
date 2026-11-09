"use client";

import { useCartStore } from "@/lib/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function CartToast() {
  const { items, lastAddedItem, setLastAddedItem, setIsOpen } = useCartStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto dismiss logic
  useEffect(() => {
    if (lastAddedItem) {
      // Clear any existing timer
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Start new dismiss timer
      timeoutRef.current = setTimeout(() => {
        setLastAddedItem(null);
      }, 4500);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [lastAddedItem, setLastAddedItem]);

  const handlePauseTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleResumeTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setLastAddedItem(null);
    }, 3000);
  };

  if (!lastAddedItem) return null;

  // Other items in cart excluding the newly added one
  const otherItems = items.filter(
    (i) =>
      !(
        i.product_id === lastAddedItem.product_id &&
        i.size === lastAddedItem.size &&
        i.color === lastAddedItem.color
      )
  );

  const totalQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <AnimatePresence>
      {/* Desktop: Small sleek note */}
      <motion.div
        key="cart-toast-desktop"
        initial={{ opacity: 0, y: -16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={handlePauseTimer}
        onMouseLeave={handleResumeTimer}
        className="hidden md:flex fixed top-24 right-6 z-[80] items-center gap-3 rounded-full border border-white/15 bg-[#0c0c0c]/95 px-4 py-2 text-[#ede9e3] shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl font-sans"
      >
        <span className="text-[11px] font-bold tracking-widest text-white uppercase">
          Added to cart
        </span>
        <span className="h-3 w-px bg-white/20" />
        <button
          type="button"
          onClick={() => {
            setLastAddedItem(null);
            setIsOpen(true);
          }}
          className="text-[10px] font-bold tracking-wider text-white/80 hover:text-white uppercase transition cursor-pointer"
        >
          View Bag
        </button>
        <button
          type="button"
          onClick={() => setLastAddedItem(null)}
          className="p-1 -mr-1 text-white/40 hover:text-white transition cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X size={13} />
        </button>
      </motion.div>

      {/* Mobile Backdrop Overlay */}
      <motion.div
        key="cart-toast-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setLastAddedItem(null)}
        className="fixed inset-0 z-[79] bg-black/60 backdrop-blur-xs md:hidden"
      />

      {/* Mobile Action Sheet Drawer */}
      <motion.div
        key="cart-toast-mobile-content"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={handlePauseTimer}
        onMouseLeave={handleResumeTimer}
        className="fixed inset-x-0 bottom-0 z-[80] w-full rounded-t-[28px] border-t border-white/[0.12] bg-[#0c0c0c]/98 p-5 pb-8 text-[#ede9e3] shadow-[0_-12px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl font-sans md:hidden"
      >
        {/* Mobile Swipe / Drag Handle Indicator */}
        <div className="mx-auto w-10 h-1 rounded-full bg-white/20 mb-3.5" />

        {/* Header (Green dot removed) */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">Added to Cart</span>
          </div>
          <button
            onClick={() => setLastAddedItem(null)}
            className="p-1 -mr-1 text-white/50 hover:text-white transition cursor-pointer"
            aria-label="Close popup"
          >
            <X size={15} />
          </button>
        </div>

        {/* Item Content Preview */}
        <div className="flex gap-3.5 items-center">
          <div className="relative size-16 sm:size-18 rounded-xl overflow-hidden border border-white/[0.08] bg-[#141414] shrink-0">
            <Image
              src={lastAddedItem.thumbnail || "/products/f3k/ARCH-01/front.png"}
              alt={lastAddedItem.name}
              fill
              sizes="72px"
              className="object-contain p-1"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-wider truncate">
              {lastAddedItem.name}
            </h4>
            <div className="flex items-center gap-2 text-[10px] tracking-wider text-white/50 uppercase mt-0.5">
              <span>Size: {lastAddedItem.size}</span>
              <span>•</span>
              <span>{lastAddedItem.color}</span>
              <span>•</span>
              <span>Qty: {lastAddedItem.quantity}</span>
            </div>
            <p className="text-xs font-bold text-white mt-1">
              ₹{(lastAddedItem.price * lastAddedItem.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="mt-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={13} className="text-white/70" />
            <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wider">
              Bag Subtotal • {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </span>
          </div>
          <span className="text-[11px] font-bold text-white">
            ₹{items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => {
              setLastAddedItem(null);
              setIsOpen(true);
            }}
            className="flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/25 bg-transparent text-[11px] font-bold uppercase tracking-wider text-white hover:bg-white/10 active:scale-[0.98] transition cursor-pointer"
          >
            View Bag
          </button>
          <Link
            href="/checkout"
            onClick={() => setLastAddedItem(null)}
            className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-white text-[11px] font-bold uppercase tracking-wider text-black hover:bg-neutral-200 active:scale-[0.98] transition cursor-pointer shadow-lg"
          >
            <span>Checkout</span>
            <ArrowRight size={13} strokeWidth={2.4} />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
