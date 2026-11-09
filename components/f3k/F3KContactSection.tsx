"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Send, 
  RotateCcw,
  Package
} from "lucide-react";

export default function F3KContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [topic, setTopic] = useState("Order Status & Tracking");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <section id="contact" className="w-full bg-white text-neutral-900 py-12 sm:py-24 border-b border-neutral-300 font-sans scroll-mt-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12">
        <div className="bg-[#fafaf8] rounded-2xl sm:rounded-3xl p-5 sm:p-12 lg:p-16 border border-neutral-300 shadow-xs">
          
          {/* Main 2-Column Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Column: Support Info, Direct Channels & Quick Actions */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-neutral-500 bg-neutral-200/60 px-3 py-1 rounded-full mb-3">
                  Customer Support
                </span>
                <h2 className="font-sans font-bold text-2xl sm:text-5xl uppercase tracking-tight text-neutral-900">
                  Contact Us
                </h2>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed font-sans">
                  Have a question about an order, sizing, shipping, or returns? Send us a message below or email our support specialists directly at{" "}
                  <a href="mailto:support@f3k.com" className="text-black font-semibold underline underline-offset-2">
                    support@f3k.com
                  </a>.
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-4 pt-2 border-t border-neutral-200 text-xs text-neutral-700">
                <div className="flex items-start gap-3.5">
                  <div className="size-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <Mail size={15} className="text-neutral-800" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Email Assistance</p>
                    <a href="mailto:support@f3k.com" className="text-neutral-600 hover:text-black hover:underline">
                      support@f3k.com
                    </a>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Average reply time: under 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="size-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <Clock size={15} className="text-neutral-800" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Support Hours</p>
                    <p className="text-neutral-600">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Direct customer support &amp; email responses</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="size-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck size={15} className="text-neutral-800" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Hassle-Free Returns &amp; Exchanges</p>
                    <p className="text-neutral-600">14-day complimentary pickup on all orders</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions (Returns Portal & Track Order) */}
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/dashboard?tab=orders"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
                >
                  <Package size={13} />
                  <span>Track Existing Order</span>
                  <ArrowRight size={13} />
                </Link>
                <span className="text-neutral-300">•</span>
                <Link
                  href="/returns"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
                >
                  <RotateCcw size={13} />
                  <span>Returns &amp; Exchanges Portal</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-10 shadow-sm">
                {submitted ? (
                  <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="size-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-neutral-900">
                      Message Received
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out, <span className="font-semibold text-neutral-900">{name}</span>. {orderId ? `We noted order #${orderId}. ` : ""}Our customer support team has logged your inquiry and will reply to <span className="font-semibold text-neutral-900">{email}</span> within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setMessage("");
                        setOrderId("");
                      }}
                      className="mt-4 px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare size={16} className="text-neutral-700" />
                      <h3 className="text-base font-bold uppercase tracking-tight text-neutral-900">
                        Send a Message
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Smith"
                          className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. you@example.com"
                          className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Order Number (Optional) */}
                      <div>
                        <label htmlFor="contact-order-id" className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                          Order Number <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          id="contact-order-id"
                          type="text"
                          value={orderId}
                          onChange={(e) => setOrderId(e.target.value)}
                          placeholder="e.g. F3K-9482"
                          className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition"
                        />
                      </div>

                      {/* Topic */}
                      <div>
                        <label htmlFor="contact-topic" className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                          How Can We Help?
                        </label>
                        <select
                          id="contact-topic"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs text-neutral-900 focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition cursor-pointer"
                        >
                          <option value="General Question">General Question</option>
                          <option value="Order Status & Tracking">Order Status &amp; Tracking</option>
                          <option value="Returns & Exchanges">Returns, Exchanges &amp; Refunds</option>
                          <option value="Sizing & Fit Advice">Drop 001 Sizing &amp; Fit Advice</option>
                          <option value="Fabric & 500 GSM Specifications">Fabric &amp; 500 GSM Specifications</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what you need help with..."
                        className="w-full p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none transition resize-none"
                      />
                    </div>

                    {/* Submit Button & Response Time Note */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-[11px] text-neutral-500 font-sans">
                        Usually replies within 24 hours
                      </span>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-8 h-11 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {loading ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <Send size={14} />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export { F3KContactSection as F3KContactBox };
