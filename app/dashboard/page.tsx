import { Metadata } from "next";
import F3KNavbar from "@/components/f3k/F3KNavbar";
import F3KFooter from "@/components/f3k/F3KFooter";
import DashboardContent from "@/components/DashboardContent";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Account & Orders — FUTURE3000 // F3K",
  description: "Manage your Drop 001 reservations, order tracking, saved wishlist, shipping addresses, and personal fit profile.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] text-neutral-900 font-sans selection:bg-black selection:text-white flex flex-col justify-between">
      {/* Universal Floating Navigation Bar */}
      <F3KNavbar />

      <main className="flex-1 w-full pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Suspense
            fallback={
              <div className="flex h-[400px] flex-col items-center justify-center gap-3">
                <div className="size-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
                <p className="text-xs font-mono tracking-wider text-neutral-500 uppercase">
                  Loading Account...
                </p>
              </div>
            }
          >
            <DashboardContent />
          </Suspense>
        </div>
      </main>

      {/* Global Footer */}
      <F3KFooter />
    </div>
  );
}
