"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, CheckCircle2, User as UserIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

interface F3KAuthCardProps {
  initialMode?: "sign-in" | "sign-up";
  redirectUrl?: string;
}

export default function F3KAuthCard({ 
  initialMode = "sign-in", 
  redirectUrl = "/dashboard" 
}: F3KAuthCardProps) {
  const router = useRouter();
  const clerk = useClerk();

  const [mode, setMode] = useState<"sign-in" | "sign-up">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentic atelier login / registration sequence
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(redirectUrl);
      }, 700);
    }, 600);
  };

  const handleSocialClick = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(redirectUrl);
      }, 600);
    }, 500);
  };

  const handleQuickDemoLogin = () => {
    setEmail("collector@f3k.com");
    setPassword("atelier2026");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(redirectUrl);
      }, 600);
    }, 450);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between font-sans selection:bg-neutral-900 selection:text-white">
      {/* 1. Underlying Sky Gradient (Daylight Celestial Blue) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8fc8f6] via-[#bfe1fc] to-[#e4f2fd] pointer-events-none" />

      {/* 2. Photo Backdrop with Fluffy Cumulus Clouds from Reference Art */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-95"
        style={{ backgroundImage: `url('/images/f3k_auth_backdrop.png')` }}
      />

      {/* 3. Glowing White Concentric Arc Rings (Prominent hairline arch behind the box matching reference geometry) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 736 552" 
          preserveAspectRatio="xMidYMid slice"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="f3kGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#ffffff" floodOpacity="0.85" />
            </filter>
          </defs>
          {/* Faint Outer Ring */}
          <circle cx="368" cy="535" r="420" stroke="#ffffff" strokeWidth="1" opacity="0.35" />
          
          {/* Secondary Ring */}
          <circle cx="368" cy="535" r="378" stroke="#ffffff" strokeWidth="1" opacity="0.55" />
          
          {/* Primary Prominent Horizon Arc - Passes right behind the upper third of the box with glowing white hairline */}
          <circle 
            cx="368" 
            cy="535" 
            r="339" 
            stroke="#ffffff" 
            strokeWidth="1.25" 
            opacity="0.95" 
            filter="url(#f3kGlow)" 
          />
          
          {/* Inner Accent Ring */}
          <circle cx="368" cy="535" r="300" stroke="#ffffff" strokeWidth="1" opacity="0.45" />
        </svg>
      </div>

      {/* 4. Top Minimal Header: Brand Logo 'f3k' strictly on left, clean sky on right */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 sm:py-8 flex items-center justify-between">
        <Link 
          href="/" 
          className="font-archivo text-xl sm:text-2xl tracking-tight uppercase font-extrabold text-neutral-900 hover:opacity-75 transition select-none"
        >
          f3k
        </Link>
      </header>

      {/* 5. Central Floating Glass Card (Pixel-perfect match to user reference) */}
      <main className="relative z-20 flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-[400px] sm:max-w-[415px] rounded-[32px] bg-gradient-to-b from-[#eaf4fd]/95 via-white/98 to-white p-7 sm:p-9 shadow-[0_24px_60px_-15px_rgba(20,60,110,0.18),0_2px_10px_rgba(0,0,0,0.03)] border border-white/90 backdrop-blur-xl transition-all">
          
          {/* Top Square Icon Badge: Arrow entering bracket [->] */}
          <div className="w-[52px] h-[52px] rounded-2xl bg-white border border-neutral-200/80 shadow-[0_3px_12px_rgba(0,0,0,0.05)] flex items-center justify-center mx-auto mb-4.5 transition-transform hover:scale-105">
            <svg 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-neutral-800"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-[22px] font-bold tracking-tight text-neutral-900 text-center">
            {mode === "sign-in" ? "Sign in with email" : "Create atelier account"}
          </h1>

          {/* Subtitle with F3K Streetwear Context */}
          <p className="text-[12.5px] text-neutral-500 text-center max-w-[285px] mx-auto mt-2 mb-6 leading-relaxed">
            {mode === "sign-in"
              ? "Access your Drop 001 reservations, order tracking, and private atelier member privileges."
              : "Join the F3K collector list for exclusive access to Drop 001 and future numbered releases."}
          </p>

          {/* Success Overlay Banner */}
          {success ? (
            <div className="py-8 text-center space-y-3 font-sans animate-in fade-in zoom-in-95 duration-200">
              <div className="size-12 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-base font-bold text-neutral-900 uppercase tracking-tight">
                Privileges Authenticated
              </h3>
              <p className="text-xs text-neutral-600">
                Entering client locker &amp; member archive...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs">
              {/* Full Name field if Sign-Up mode */}
              {mode === "sign-up" && (
                <div className="relative flex items-center bg-[#f0f3f6] rounded-xl px-3.5 py-3 border border-transparent focus-within:border-neutral-300 focus-within:bg-white transition-all">
                  <UserIcon size={15} className="text-neutral-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="text-xs text-neutral-900 placeholder:text-neutral-400 bg-transparent w-full outline-none font-sans"
                  />
                </div>
              )}

              {/* Email Input Field */}
              <div className="relative flex items-center bg-[#f0f3f6] rounded-xl px-3.5 py-3 border border-transparent focus-within:border-neutral-300 focus-within:bg-white transition-all">
                <Mail size={15} className="text-neutral-400 mr-2.5 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="text-xs text-neutral-900 placeholder:text-neutral-400 bg-transparent w-full outline-none font-sans"
                />
              </div>

              {/* Password Input Field with Visibility Toggle */}
              <div className="relative flex items-center bg-[#f0f3f6] rounded-xl px-3.5 py-3 border border-transparent focus-within:border-neutral-300 focus-within:bg-white transition-all">
                <Lock size={15} className="text-neutral-400 mr-2.5 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="text-xs text-neutral-900 placeholder:text-neutral-400 bg-transparent w-full outline-none font-sans pr-6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {/* Forgot Password Link (Sign-In Mode) */}
              {mode === "sign-in" && (
                <div className="flex justify-end pt-0.5">
                  <button
                    type="button"
                    onClick={() => setForgotSent(!forgotSent)}
                    className="text-[11px] text-neutral-500 hover:text-neutral-900 transition font-medium cursor-pointer"
                  >
                    {forgotSent ? "Recovery link sent to email ✓" : "Forgot password?"}
                  </button>
                </div>
              )}

              {/* Primary Action Button (Get Started) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 py-3 rounded-xl bg-[#1b1c20] hover:bg-black text-white text-xs font-semibold tracking-wide transition-all shadow-md active:scale-[0.99] cursor-pointer text-center disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <span>{loading ? "Authenticating..." : mode === "sign-in" ? "Get Started" : "Create Account"}</span>
              </button>

              {/* Divider: Or sign in with (dotted line matching reference) */}
              <div className="relative my-5 flex items-center justify-center">
                <div className="w-full border-t border-dotted border-neutral-300" />
                <span className="absolute bg-white px-3 text-[11px] text-neutral-400 font-sans">
                  {mode === "sign-in" ? "Or sign in with" : "Or register with"}
                </span>
              </div>

              {/* Social Login Buttons: Google, Facebook/Meta, Apple */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* 1. Google Button */}
                <button
                  type="button"
                  onClick={() => handleSocialClick("google")}
                  aria-label="Sign in with Google"
                  title="Google"
                  className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-neutral-200/90 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition shadow-2xs cursor-pointer"
                >
                  <svg className="size-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </button>

                {/* 2. Facebook Button */}
                <button
                  type="button"
                  onClick={() => handleSocialClick("facebook")}
                  aria-label="Sign in with Facebook"
                  title="Facebook"
                  className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-neutral-200/90 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition shadow-2xs cursor-pointer"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>

                {/* 3. Apple Button */}
                <button
                  type="button"
                  onClick={() => handleSocialClick("apple")}
                  aria-label="Sign in with Apple"
                  title="Apple"
                  className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-neutral-200/90 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition shadow-2xs cursor-pointer text-black"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.59.69-1.12 1.83-0.98 2.95 1.07.08 2.14-.54 2.79-1.29z"/>
                  </svg>
                </button>
              </div>

              {/* Toggle Mode: Sign In vs Sign Up */}
              <div className="pt-3 text-center border-t border-neutral-100 mt-4">
                {mode === "sign-in" ? (
                  <p className="text-[11px] text-neutral-500">
                    New to F3K?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("sign-up")}
                      className="font-semibold text-neutral-900 hover:underline cursor-pointer"
                    >
                      Create member account
                    </button>
                  </p>
                ) : (
                  <p className="text-[11px] text-neutral-500">
                    Already an atelier collector?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("sign-in")}
                      className="font-semibold text-neutral-900 hover:underline cursor-pointer"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>

              {/* 1-Click Fast Preview Fill for Seamless Testing */}
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="text-[10px] text-neutral-400 hover:text-neutral-700 transition font-sans cursor-pointer"
                >
                  ✦ Quick Fill: collector@f3k.com
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* 6. Bottom Footer: Strictly future3000 */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs font-sans text-neutral-500/80 tracking-widest uppercase">
        <span>future3000</span>
      </footer>
    </div>
  );
}
