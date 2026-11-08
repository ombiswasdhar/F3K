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
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95, x: 20 }}
        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
        exit={{ opacity: 0, y: -10, scale: 0.95, x: 10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={handlePauseTimer}
        onMouseLeave={handleResumeTimer}
        className="fixed top-28 right-4 z-[60] w-full max-w-sm rounded-[24px] border border-white/[0.08] bg-[#0c0c0c]/95 p-5 text-[#ede9e3] shadow-[0_12px_50px_rgba(0,0,0,0.8)] backdrop-blur-md font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold tracking-wider text-white uppercase">Added to Bag</span>
          </div>
          <button
            onClick={() => setLastAddedItem(null)}
            className="text-white/45 hover:text-white transition cursor-pointer"
          >
            <X size={13} />
          </button>
        </div>

        {/* Item Content Preview */}
        <div className="flex gap-4">
          <div className="relative size-16 rounded-xl overflow-hidden border border-white/[0.06] bg-[#141414] shrink-0">
            <Image
              src={lastAddedItem.thumbnail || "/products/f3k/ARCH-01/front.png"}
              alt={lastAddedItem.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h4 className="text-[11px] font-black text-white uppercase tracking-wider truncate">
              {lastAddedItem.name}
            </h4>
            <p className="text-[9px] tracking-widest text-white/35 uppercase mt-0.5">
              Size: {lastAddedItem.size} | Color: {lastAddedItem.color} | Qty: {lastAddedItem.quantity}
            </p>
            <p className="text-xs font-bold text-white mt-1">
              ₹{(lastAddedItem.price * lastAddedItem.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="mt-4 bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={13} className="text-white/60" />
            <span className="text-[10px] font-bold text-white uppercase">
              Bag Total • {totalQuantity} items
            </span>
          </div>
          {otherItems.length > 0 && (
            <span className="text-[9px] font-medium text-white/50 uppercase tracking-wide">
              +{otherItems.length} other items
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          <button
            onClick={() => {
              setLastAddedItem(null);
              setIsOpen(true);
            }}
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-transparent text-[10px] font-bold uppercase tracking-wider text-white hover:bg-white/10 transition cursor-pointer"
          >
            View Bag
          </button>
          <Link
            href="/checkout"
            onClick={() => setLastAddedItem(null)}
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-white text-[10px] font-bold uppercase tracking-wider text-black hover:bg-neutral-200 transition cursor-pointer"
          >
            <span>Checkout</span>
            <ArrowRight size={11} strokeWidth={2.4} />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
