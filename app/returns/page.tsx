import F3KNavbar from "@/components/f3k/F3KNavbar";
import F3KFooter from "@/components/f3k/F3KFooter";
import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw, ShieldCheck, Truck, ArrowRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & Refund Policy — F3K",
  description: "F3K 14-day hassle-free return and refund portal.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-black selection:text-white flex flex-col justify-between">
      <F3KNavbar />

      <main className="flex-1 w-full pt-24 sm:pt-28 pb-20 px-6 sm:px-12 md:px-16 max-w-4xl mx-auto">
        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-100 text-[10px] font-sans uppercase tracking-wider text-neutral-600">
            <RotateCcw size={12} />
            <span>Client Care &amp; Guarantees</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-neutral-900 font-archivo">
            Returns &amp; Refunds
          </h1>
          <p className="text-sm text-neutral-500 max-w-xl font-sans">
            Every garment from FUTURE3000 • F3K Drop 001 is protected by our 14-day return and exchange policy.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
            <RotateCcw size={18} className="text-neutral-900" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900">14-Day Window</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Initiate a return or size exchange within 14 days of confirmed delivery.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
            <ShieldCheck size={18} className="text-neutral-900" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Instant Refund</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Refunds are credited to your original payment method within 3–5 business days after inspection.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
            <Truck size={18} className="text-neutral-900" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Doorstep Pickup</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Pre-paid reverse pickup is arranged directly from your doorstep with real-time tracking.
            </p>
          </div>
        </div>

        {/* Return Details */}
        <div className="space-y-8 text-xs leading-relaxed text-neutral-700 border-t border-neutral-200 pt-8">
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              1. Return Eligibility
            </h2>
            <p>
              To qualify for a refund or replacement, garments must be unworn, unwashed, and in their original packaging with all architectural tags attached. T-shirts showing signs of wear, fragrance, or damage cannot be processed.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              2. How to Initiate a Return or Exchange
            </h2>
            <p>
              You can start your return directly from your member locker at{" "}
              <Link href="/dashboard?tab=orders" className="text-black font-semibold underline underline-offset-2">
                My Orders
              </Link>
              , or email our concierge at{" "}
              <a href="mailto:concierge@f3k.com" className="text-black font-semibold underline underline-offset-2">
                concierge@f3k.com
              </a>{" "}
              with your order number (e.g., #F3K-0012).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              3. Refund Processing Timelines
            </h2>
            <p>
              Once your parcel arrives at our atelier hub (Tokyo or Mumbai) and passes quality verification, your refund will be triggered immediately. UPI and credit card transactions reflect within 3–5 business days. Store credits are available instantly.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              4. Damaged or Defective Items
            </h2>
            <p>
              If your garment arrives with any defect or printing irregularity, we provide an immediate priority replacement or a 100% full refund with zero reverse pickup fees.
            </p>
          </section>
        </div>

        {/* Quick Action Box */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-sm uppercase tracking-wider">Need help with an exchange?</h4>
            <p className="text-xs text-neutral-400">Our concierge team replies in under 15 minutes.</p>
          </div>
          <a
            href="mailto:concierge@f3k.com"
            className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition"
          >
            Contact Concierge →
          </a>
        </div>
      </main>

      <F3KFooter />
    </div>
  );
}

