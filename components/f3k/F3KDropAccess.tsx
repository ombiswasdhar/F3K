"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function F3KDropAccess() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section className="w-full bg-[#111] text-white py-16 sm:py-20 border-b border-neutral-800">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 text-center">
        <div className="max-w-xl mx-auto font-sans">
          <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            Stay Updated
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            Sign up to receive updates on new arrivals and seasonal sales.
          </p>

          {isSubmitted ? (
            <div className="mt-6 p-4 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center gap-2 text-white text-xs">
              <Check size={16} className="text-emerald-400" />
              <span>Thank you for subscribing.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-neutral-900 border border-neutral-700 text-white text-xs focus:outline-none focus:border-white transition placeholder:text-neutral-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
