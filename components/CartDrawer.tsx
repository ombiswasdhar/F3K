"use client";

import { useCartStore } from "@/lib/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReality } from "@/context/RealityThemeContext";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getCartSubtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const { reality } = useReality();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const subtotal = getCartSubtotal();
  const shipping = 0; // Complimentary atelier shipping on Drop 001
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10001] overflow-hidden font-sans">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer container */}
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-6 md:pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md border-l bg-[var(--card-bg)] text-[var(--text-primary)] shadow-2xl flex flex-col h-full"
              style={{ borderColor: "var(--border-color)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b p-5" style={{ borderColor: "var(--border-light)" }}>
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={16} className="text-neutral-800" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">
                    Shopping Bag ({items.reduce((acc, curr) => acc + curr.quantity, 0)})
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="border px-2.5 py-1 text-xs uppercase hover:bg-black hover:text-white transition-colors rounded"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  Close [✕]
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" data-lenis-prevent>
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="border border-neutral-300 p-4 mb-4 rounded-full">
                      <ShoppingBag size={24} className="opacity-40" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-neutral-800 mb-1">Your bag is empty</p>
                    <p className="text-xs text-neutral-500 max-w-xs mb-6">
                      Explore our collections and add pieces to your bag.
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="border border-black px-6 py-2.5 text-xs uppercase font-medium bg-black text-white hover:bg-neutral-800 transition-all rounded-full"
                    >
                      Continue Shopping →
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.product_id}-${item.size}-${item.color}`}
                      className="flex gap-3 border p-3 bg-white transition rounded-lg"
                      style={{ borderColor: "var(--border-light)" }}
                    >
                      {/* Thumbnail preview */}
                      <div className="relative size-20 border shrink-0 bg-neutral-100 rounded overflow-hidden" style={{ borderColor: "var(--border-light)" }}>
                        <Image
                          src={item.thumbnail || "/products/f3k/ARCH-01/front.png"}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-bold uppercase truncate text-neutral-900">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.product_id, item.size, item.color)}
                              className="text-neutral-400 hover:text-black transition text-xs"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                            <span>Size: {item.size}</span>
                            <span>•</span>
                            <span>{item.color}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-neutral-100">
                          {/* Stepper */}
                          <div className="flex items-center border border-neutral-300 rounded">
                            <button
                              onClick={() => updateQuantity(item.product_id, item.size, item.color, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs hover:bg-neutral-100 text-neutral-600"
                            >
                              -
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-semibold border-x border-neutral-300 text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product_id, item.size, item.color, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs hover:bg-neutral-100 text-neutral-600"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-bold text-xs text-neutral-900">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Summary */}
              {items.length > 0 && (
                <div className="border-t p-5 space-y-3 bg-white" style={{ borderColor: "var(--border-light)" }}>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Shipping</span>
                      <span className="text-emerald-700 font-semibold uppercase">Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm pt-2 border-t border-neutral-200 text-neutral-900">
                      <span>Total</span>
                      <span>₹{total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all bg-black text-white hover:bg-neutral-800 rounded-full"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={14} />
                  </Link>

                  <div className="text-[10px] text-neutral-500 text-center tracking-normal">
                    Free shipping and 14-day returns on all domestic orders
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
