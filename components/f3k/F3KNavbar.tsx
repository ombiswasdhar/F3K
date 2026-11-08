"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home,
  ShoppingBag, 
  ChevronDown, 
  Search, 
  X, 
  ArrowRight, 
  Heart, 
  User, 
  Package, 
  Sparkles,
  RotateCcw, 
  Truck, 
  HelpCircle 
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";
import { f3kProducts } from "@/components/f3k/F3KCatalogGrid";

interface F3KNavbarProps {
  className?: string;
  theme?: "light" | "dark";
}

export default function F3KNavbar({ className = "", theme = "light" }: F3KNavbarProps) {
  const { items, isOpen: isCartOpen, setIsOpen } = useCartStore();
  const { items: wishlistItems, removeItem: removeWishlistItem } = useWishlistStore();
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const wishlistContainerRef = useRef<HTMLDivElement>(null);
  const profileContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const cartCount = items.reduce((total, i) => total + i.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search preview/bar, wishlist and profile when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (wishlistContainerRef.current && !wishlistContainerRef.current.contains(e.target as Node)) {
        setIsWishlistOpen(false);
      }
      if (profileContainerRef.current && !profileContainerRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter matching products for live search preview
  const liveSearchResults = searchQuery.trim().length >= 2
    ? f3kProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase().trim())
      ).slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isDark = theme === "dark";
  const isLightSurface = scrolled ? !isDark : pathname === "/about";
  const logoSrc = isLightSurface ? "/logo/f3k-mark-black.png" : "/logo/f3k-mark-white.png";

  // Active mobile tab logic (faithful to Dribbble reference capsule nav)
  const getActiveTab = () => {
    if (isCartOpen) return "bag";
    if (isSearchOpen) return "search";
    if (isWishlistOpen) return "wishlist";
    if (pathname.startsWith("/products") || pathname === "/men" || pathname === "/women") return "shop";
    if (pathname === "/") return "home";
    return "";
  };

  const activeMobileTab = getActiveTab();

  // Solid icons matching the reference aesthetic
  const SolidHomeIcon = ({ className = "size-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <path d="M12 2.5L2 11h3v9.5a.5.5 0 0 0 .5.5H9.5a.5.5 0 0 0 .5-.5V14a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v6.5a.5.5 0 0 0 .5.5H18.5a.5.5 0 0 0 .5-.5V11h3L12 2.5z" />
    </svg>
  );

  const SolidShopIcon = ({ className = "size-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.75" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.75" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.75" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.75" />
    </svg>
  );

  const SolidSearchIcon = ({ className = "size-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.5 3.5a7 7 0 1 0 4.38 12.46l4.33 4.33a1 1 0 0 0 1.41-1.41l-4.33-4.33A7 7 0 0 0 10.5 3.5zm-5 7a5 5 0 1 1 10 0 5 5 0 0 1-10 0z" />
    </svg>
  );

  const SolidHeartIcon = ({ className = "size-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );

  const SolidBagIcon = ({ className = "size-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 6a4 4 0 0 1 8 0h3a1 1 0 0 1 1 1.05l-1.12 12.35A3 3 0 0 1 15.89 22H8.11a3 3 0 0 1-2.99-2.6L4 7.05A1 1 0 0 1 5 6h3zm2 0a2 2 0 1 1 4 0h-4z" />
    </svg>
  );

  const mobileNavItems = [
    { id: "home", label: "Home", icon: SolidHomeIcon, href: "/" },
    { id: "shop", label: "Shop", icon: SolidShopIcon, href: "/products" },
    { 
      id: "search", 
      label: "Search", 
      icon: SolidSearchIcon, 
      onClick: () => {
        setIsSearchOpen((prev) => !prev);
        setIsWishlistOpen(false);
        setProfileMenuOpen(false);
      }
    },
    { 
      id: "wishlist", 
      label: "Saved", 
      icon: SolidHeartIcon, 
      badge: mounted && wishlistItems.length > 0 ? wishlistItems.length : undefined,
      onClick: () => {
        setIsWishlistOpen((prev) => !prev);
        setIsSearchOpen(false);
        setProfileMenuOpen(false);
      }
    },
    { 
      id: "bag", 
      label: "Bag", 
      icon: SolidBagIcon, 
      badge: mounted && cartCount > 0 ? cartCount : undefined,
      onClick: () => {
        setIsOpen(true);
        setIsSearchOpen(false);
        setIsWishlistOpen(false);
        setProfileMenuOpen(false);
      }
    },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 pointer-events-none ${
        scrolled 
          ? isDark
            ? "bg-black/85 backdrop-blur-md border-b border-white/10 shadow-lg py-2"
            : "bg-white/85 backdrop-blur-md border-b border-black/5 shadow-xs py-2" 
          : "bg-transparent py-2.5 sm:py-3.5"
      } ${className}`}
    >
      <div className="pointer-events-auto mx-auto flex items-center justify-between md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-2 px-5 sm:px-12 md:px-16 text-[9px] leading-[1.3] sm:text-[11px]">
        {/* Left: Brand Logo (Adhering to F3K Brand Guidelines: compact mark with 24px min height & correct contrast) */}
        <Link 
          href="/" 
          className="justify-self-start select-none hover:opacity-75 transition-opacity flex items-center py-1"
          aria-label="F3K Home"
        >
          <Image
            src={logoSrc}
            alt="F3K"
            width={84}
            height={28}
            priority
            className="h-5 sm:h-6 w-auto object-contain"
          />
        </Link>

        {/* Center: Scaled-Down (-30%) Floating Rounded Pill Navigation (Desktop Only) */}
        <nav 
          aria-label="Main navigation" 
          className="hidden md:flex relative items-center justify-self-center gap-2 sm:gap-4 whitespace-nowrap rounded-full bg-[#242424]/95 backdrop-blur-md px-3.5 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-[12px] text-white shadow-lg border border-white/10 font-sans"
        >
          {/* 1. Home Icon */}
          <Link 
            href="/" 
            aria-label="Home"
            title="Home"
            className="transition-colors hover:text-neutral-300 flex items-center p-0.5 cursor-pointer"
          >
            <Home size={13} />
          </Link>

          {/* 2. Search Icon: Click to Open Bar */}
          <div ref={searchContainerRef} className="relative flex items-center">
            {!isSearchOpen ? (
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsWishlistOpen(false);
                  setTimeout(() => searchInputRef.current?.focus(), 50);
                }}
                aria-label="Open search bar"
                className="transition-colors hover:text-neutral-300 flex items-center cursor-pointer p-0.5"
                title="Search t-shirts"
              >
                <Search size={13} />
              </button>
            ) : (
              <div className="relative flex items-center">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search 
                    size={11} 
                    className="absolute left-2.5 text-neutral-400 pointer-events-none" 
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tees..."
                    className="text-[10px] sm:text-[11px] font-sans bg-black/50 text-white placeholder-neutral-400 pl-7 pr-5 py-0.5 sm:py-1 rounded-full border border-white/20 focus:border-white/40 outline-none transition-all w-24 sm:w-36 focus:w-32 sm:focus:w-44"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="absolute right-1.5 text-neutral-400 hover:text-white cursor-pointer"
                    aria-label="Close search"
                  >
                    <X size={10} />
                  </button>
                </form>

                {/* Instant Live Search Results Flyout (Light & Minimal) */}
                {liveSearchResults.length > 0 && (
                  <div className="absolute top-full left-0 mt-2.5 w-64 sm:w-72 rounded-2xl bg-white border border-neutral-200 p-2 shadow-2xl z-50 overflow-hidden font-sans text-neutral-900">
                    <div className="px-2.5 py-1 text-[10px] font-sans tracking-wider text-neutral-500 uppercase border-b border-neutral-100 flex justify-between items-center">
                      <span>Matching T-Shirts</span>
                      <span>{liveSearchResults.length} found</span>
                    </div>
                    <div className="py-1 divide-y divide-neutral-100">
                      {liveSearchResults.map((item) => (
                        <Link
                          key={item.id}
                          href={`/products/${item.slug}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-neutral-50 transition group"
                        >
                          <div className="relative size-9 bg-neutral-100 rounded-md overflow-hidden shrink-0 border border-neutral-200">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-0.5"
                              sizes="36px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[11px] text-neutral-900 font-medium truncate group-hover:text-black">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-1.5 text-[9px] text-neutral-500 mt-0.5 font-sans">
                              <span>₹{item.price.toLocaleString("en-IN")}</span>
                              <span>•</span>
                              <span className="truncate">{item.category}</span>
                            </div>
                          </div>
                          <ArrowRight size={11} className="text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5 shrink-0" />
                        </Link>
                      ))}
                    </div>
                    <div className="p-1 pt-1.5 border-t border-neutral-100 text-center">
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="w-full text-[10px] text-neutral-700 hover:text-black font-medium py-0.5 text-center cursor-pointer"
                      >
                        View all results for "{searchQuery}" →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. Shop with Seamless Minimal Flyout Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShopMenuOpen(true)}
            onMouseLeave={() => setShopMenuOpen(false)}
          >
            <Link 
              href="/products" 
              className="inline-flex items-center gap-1 transition-colors hover:text-neutral-300 font-medium"
            >
              <span>Shop</span>
              <ChevronDown size={11} className={`transition-transform duration-200 ${shopMenuOpen ? "rotate-180" : ""}`} />
            </Link>

            {/* Seamless Flyout Dropdown (Light & Minimal) */}
            {shopMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-56 z-50 font-sans">
                <div className="rounded-none bg-white border border-neutral-300 p-2 shadow-2xl text-[11px] text-neutral-800 space-y-0.5">
                  <div className="px-2.5 py-1 text-[9px] font-sans tracking-wider text-neutral-400 uppercase border-b border-neutral-100">
                    Drop 001 Silhouettes
                  </div>
                  <Link 
                    href="/products" 
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-none hover:bg-neutral-100 text-neutral-900 transition font-semibold"
                  >
                    <span>All 5 Silhouettes</span>
                    <span className="text-[9px] font-sans text-neutral-400">01–05</span>
                  </Link>
                  <Link 
                    href="/products/arch-01-panel-tee" 
                    className="block px-2.5 py-1 rounded-none hover:bg-neutral-100 hover:text-black transition text-neutral-700"
                  >
                    ARCH-01 Panel Tee
                  </Link>
                  <Link 
                    href="/products/sanctum-spliced-tee" 
                    className="block px-2.5 py-1 rounded-none hover:bg-neutral-100 hover:text-black transition text-neutral-700"
                  >
                    SANCTUM Spliced Tee
                  </Link>
                  <Link 
                    href="/products/monolith-01-stonewashed-tee" 
                    className="block px-2.5 py-1 rounded-none hover:bg-neutral-100 hover:text-black transition text-neutral-700"
                  >
                    MONOLITH-01 Stonewashed Tee
                  </Link>
                  <Link 
                    href="/products/crot-01-orbital-tee" 
                    className="block px-2.5 py-1 rounded-none hover:bg-neutral-100 hover:text-black transition text-neutral-700"
                  >
                    CROT-01 Orbital Signal Tee
                  </Link>
                  <Link 
                    href="/products/bemuth-01-architectural-tee" 
                    className="block px-2.5 py-1 rounded-none hover:bg-neutral-100 hover:text-black transition text-neutral-700"
                  >
                    BEMUTH-01 Architectural Tee
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 3b. About the Atelier */}
          <Link
            href="/about"
            className="transition-colors hover:text-neutral-300 font-medium cursor-pointer"
          >
            About
          </Link>

          {/* 4. Contact - Scrolls directly to home page contact section */}
          <a 
            href="/#contact" 
            onClick={(e) => {
              if (typeof window !== "undefined" && window.location.pathname === "/") {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            className="transition-colors hover:text-neutral-300 font-medium cursor-pointer"
          >
            Contact
          </a>

          {/* Wishlist Heart Trigger */}
          <div ref={wishlistContainerRef} className="relative flex items-center">
            <button
              type="button"
              onClick={() => {
                setIsWishlistOpen((prev) => !prev);
                setIsSearchOpen(false);
              }}
              aria-label="Wishlist"
              className="relative transition-colors hover:text-neutral-300 flex items-center cursor-pointer p-0.5"
              title="Saved items • Wishlist"
            >
              <Heart 
                size={13} 
                className={`transition-colors ${mounted && wishlistItems.length > 0 ? "fill-white text-white" : ""}`} 
              />
              {mounted && wishlistItems.length > 0 && (
                <span className="absolute -right-2 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-black text-[8px] font-sans font-bold text-white ring-1 ring-white/20">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Seamless Wishlist Flyout (Light & Minimal) */}
            {isWishlistOpen && (
              <div className="absolute top-full right-0 mt-2.5 w-68 sm:w-76 rounded-2xl bg-white border border-neutral-200 p-2.5 shadow-2xl z-50 overflow-hidden font-sans text-neutral-900">
                <div className="px-2 py-1 text-[10px] font-sans tracking-wider text-neutral-500 uppercase border-b border-neutral-100 flex justify-between items-center">
                  <span>Wishlist ({mounted ? wishlistItems.length : 0})</span>
                  <Link
                    href="/dashboard?tab=wishlist"
                    onClick={() => setIsWishlistOpen(false)}
                    className="text-[9px] text-neutral-600 hover:text-black underline underline-offset-2 transition font-medium"
                  >
                    View Locker
                  </Link>
                </div>

                {(!mounted || wishlistItems.length === 0) ? (
                  <div className="py-6 px-3 text-center space-y-2">
                    <Heart size={20} className="mx-auto text-neutral-400 stroke-[1.5]" />
                    <p className="text-[11px] text-neutral-800 font-medium">Your wishlist is empty</p>
                    <p className="text-[9px] text-neutral-500 max-w-[200px] mx-auto">
                      Tap the heart on any product to save it to your locker.
                    </p>
                    <div className="pt-1.5">
                      <Link
                        href="/products"
                        onClick={() => setIsWishlistOpen(false)}
                        className="inline-block px-3 py-1 bg-black text-white text-[10px] font-semibold rounded-md hover:bg-neutral-800 transition"
                      >
                        Explore Drop 001
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="py-1 max-h-60 overflow-y-auto divide-y divide-neutral-100 space-y-1">
                      {wishlistItems.map((item) => (
                        <div
                          key={item.product_id}
                          className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-neutral-50 transition group"
                        >
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={() => setIsWishlistOpen(false)}
                            className="relative size-9 bg-neutral-100 rounded-md overflow-hidden shrink-0 border border-neutral-200"
                          >
                            <Image
                              src={item.thumbnail}
                              alt={item.name}
                              fill
                              className="object-contain p-0.5"
                              sizes="36px"
                            />
                          </Link>

                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${item.slug}`}
                              onClick={() => setIsWishlistOpen(false)}
                              className="text-[11px] text-neutral-900 font-medium truncate block hover:text-black"
                            >
                              {item.name}
                            </Link>
                            <div className="text-[9px] font-sans text-neutral-500 mt-0.5">
                              ₹{item.price.toLocaleString("en-IN")}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setIsOpen(true);
                                setIsWishlistOpen(false);
                              }}
                              className="px-2 py-1 bg-black text-white text-[9px] font-semibold rounded hover:bg-neutral-800 transition cursor-pointer"
                              title="Open cart"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => removeWishlistItem(item.product_id)}
                              className="p-1 text-neutral-400 hover:text-red-500 transition cursor-pointer"
                              title="Remove"
                              aria-label="Remove item from wishlist"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-1 pt-2 border-t border-neutral-100 flex justify-between items-center text-[10px]">
                      <Link
                        href="/products"
                        onClick={() => setIsWishlistOpen(false)}
                        className="text-neutral-500 hover:text-black"
                      >
                        ← Continue Shopping
                      </Link>
                      <Link
                        href="/dashboard?tab=wishlist"
                        onClick={() => setIsWishlistOpen(false)}
                        className="text-black hover:underline underline-offset-2 font-semibold"
                      >
                        Go to Locker →
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart Bag Trigger */}
          <button 
            type="button" 
            onClick={() => setIsOpen(true)} 
            aria-label="Open shopping bag" 
            className="relative ml-0.5 transition-colors hover:text-neutral-300 flex items-center cursor-pointer p-0.5"
          >
            <ShoppingBag size={13} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-black text-[8px] font-sans font-bold text-white ring-1 ring-white/20">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right: Profile, Orders, Refunds & Client Care Portal */}
        <div ref={profileContainerRef} className="relative justify-self-end flex items-center">
          <button
            type="button"
            onClick={() => {
              setProfileMenuOpen((prev) => !prev);
              setIsSearchOpen(false);
              setIsWishlistOpen(false);
            }}
            aria-label="Account and Client Services"
            className={`size-7 sm:size-8 rounded-full flex items-center justify-center transition-all shadow-xs hover:shadow cursor-pointer ${
              isDark && !scrolled
                ? "bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-sm"
                : "bg-white/90 hover:bg-white text-neutral-800 hover:text-black border border-neutral-300/80"
            }`}
            title="Account, Orders & Refund Portal"
          >
            <User size={14} className={isDark && !scrolled ? "text-white" : "text-neutral-700 hover:text-black transition"} />
          </button>

          {/* E-Commerce Profile & Care Flyout (Light & Minimal) */}
          {profileMenuOpen && (
            <div className="absolute top-full right-0 mt-2.5 w-68 sm:w-76 rounded-2xl bg-white border border-neutral-200/90 p-2 shadow-2xl z-50 text-neutral-900 font-sans overflow-hidden">
              {/* Member Status Header */}
              <div className="p-2.5 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold tracking-tight text-neutral-900 uppercase">Client Atelier</div>
                  <div className="text-[9px] text-neutral-500 font-sans">Member Services &amp; Drops</div>
                </div>
                <Link
                  href="/sign-in"
                  onClick={() => setProfileMenuOpen(false)}
                  className="text-[9px] font-bold px-2.5 py-1 bg-black text-white rounded-md hover:bg-neutral-800 transition uppercase tracking-wider"
                >
                  Sign In
                </Link>
              </div>

              {/* Core E-Commerce Links */}
              <div className="py-1 divide-y divide-neutral-100 text-[11px]">
                {/* 1. Orders & Tracking */}
                <Link
                  href="/dashboard?tab=orders"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-50 transition group"
                >
                  <div className="size-7 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 group-hover:bg-neutral-200/70 transition">
                    <Package size={13} className="text-neutral-700 group-hover:text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-neutral-900 group-hover:text-black">Orders &amp; Tracking</div>
                    <div className="text-[9px] text-neutral-500">Track shipments &amp; order history</div>
                  </div>
                  <ArrowRight size={11} className="text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5" />
                </Link>

                {/* 2. Returns & Refunds */}
                <Link
                  href="/returns"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-50 transition group"
                >
                  <div className="size-7 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 group-hover:bg-neutral-200/70 transition">
                    <RotateCcw size={13} className="text-neutral-700 group-hover:text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-neutral-900 group-hover:text-black">Returns &amp; Refunds</div>
                    <div className="text-[9px] text-neutral-500">14-day return portal &amp; instant refund</div>
                  </div>
                  <ArrowRight size={11} className="text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5" />
                </Link>

                {/* 3. Shipping & Delivery */}
                <Link
                  href="/shipping"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-50 transition group"
                >
                  <div className="size-7 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 group-hover:bg-neutral-200/70 transition">
                    <Truck size={13} className="text-neutral-700 group-hover:text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-neutral-900 group-hover:text-black">Shipping &amp; Logistics</div>
                    <div className="text-[9px] text-neutral-500">Complimentary delivery protocols</div>
                  </div>
                  <ArrowRight size={11} className="text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5" />
                </Link>

                {/* 4. Wishlist / Saved Fits */}
                <Link
                  href="/dashboard?tab=wishlist"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-50 transition group"
                >
                  <div className="size-7 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 group-hover:bg-neutral-200/70 transition">
                    <Heart size={13} className="text-neutral-700 group-hover:text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-neutral-900 group-hover:text-black">Saved Fits (Locker)</div>
                    <div className="text-[9px] text-neutral-500">Bookmarked Drop 001 pieces</div>
                  </div>
                  <ArrowRight size={11} className="text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5" />
                </Link>

                {/* 5. Profile & Addresses */}
                <Link
                  href="/dashboard?tab=profile"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-50 transition group"
                >
                  <div className="size-7 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 group-hover:bg-neutral-200/70 transition">
                    <User size={13} className="text-neutral-700 group-hover:text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-neutral-900 group-hover:text-black">Member Profile</div>
                    <div className="text-[9px] text-neutral-500">Manage address, sizing &amp; security</div>
                  </div>
                  <ArrowRight size={11} className="text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Concierge & Support Footer */}
              <div className="p-2 border-t border-neutral-100 flex items-center justify-between text-[9px] text-neutral-500 bg-neutral-50/60 rounded-b-xl">
                <span className="flex items-center gap-1">
                  <HelpCircle size={10} className="text-neutral-400" />
                  <span>24/7 Concierge:</span>
                </span>
                <a href="mailto:concierge@f3k.com" className="text-neutral-900 font-medium hover:underline">
                  concierge@f3k.com
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>

      {/* ─── MOBILE MODAL BACKDROP (WHEN SEARCH OR WISHLIST SHEET IS OPEN) ─── */}
      {(isSearchOpen || isWishlistOpen) && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => {
            setIsSearchOpen(false);
            setIsWishlistOpen(false);
          }}
          aria-hidden="true"
        />
      )}

      {/* ─── MOBILE LIVE SEARCH SHEET (FLOATS DIRECTLY ABOVE BOTTOM NAV) ─── */}
      {isSearchOpen && (
        <div className="fixed inset-x-4 bottom-22 z-50 md:hidden bg-white text-neutral-900 rounded-2xl border border-neutral-200 p-3.5 shadow-[0_16px_50px_rgba(0,0,0,0.4)] font-sans max-w-sm mx-auto animate-in slide-in-from-bottom-3 duration-200 pointer-events-auto">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
            <span className="text-[10px] tracking-wider uppercase text-neutral-500 font-semibold">Search Silhouettes</span>
            <button 
              type="button" 
              onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
              className="p-1 text-neutral-400 hover:text-black cursor-pointer"
              aria-label="Close search"
            >
              <X size={14} />
            </button>
          </div>
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tees, silhouettes..."
              autoFocus
              className="w-full bg-neutral-100 text-neutral-900 placeholder-neutral-400 pl-9 pr-8 py-2 rounded-xl text-xs outline-none border border-transparent focus:border-black/20 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </form>

          {/* Instant Live Search Results */}
          {liveSearchResults.length > 0 && (
            <div className="mt-2 divide-y divide-neutral-100 max-h-48 overflow-y-auto">
              {liveSearchResults.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                  className="flex items-center gap-2.5 py-1.5 hover:bg-neutral-50 transition group"
                >
                  <div className="relative size-8 bg-neutral-100 rounded border border-neutral-200 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-0.5" sizes="32px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium truncate">{item.name}</div>
                    <div className="text-[9px] text-neutral-500 font-sans">₹{item.price.toLocaleString("en-IN")}</div>
                  </div>
                  <ArrowRight size={11} className="text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── MOBILE WISHLIST SHEET (FLOATS DIRECTLY ABOVE BOTTOM NAV) ─── */}
      {isWishlistOpen && (
        <div className="fixed inset-x-4 bottom-22 z-50 md:hidden bg-white text-neutral-900 rounded-2xl border border-neutral-200 p-3.5 shadow-[0_16px_50px_rgba(0,0,0,0.4)] font-sans max-w-sm mx-auto animate-in slide-in-from-bottom-3 duration-200 pointer-events-auto">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
            <span className="text-[10px] tracking-wider uppercase text-neutral-500 font-semibold">
              Wishlist ({mounted ? wishlistItems.length : 0})
            </span>
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard?tab=wishlist"
                onClick={() => setIsWishlistOpen(false)}
                className="text-[10px] text-neutral-600 hover:text-black underline underline-offset-2 font-medium"
              >
                Locker
              </Link>
              <button 
                type="button" 
                onClick={() => setIsWishlistOpen(false)}
                className="p-1 text-neutral-400 hover:text-black cursor-pointer"
                aria-label="Close wishlist"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {(!mounted || wishlistItems.length === 0) ? (
            <div className="py-4 text-center space-y-1.5">
              <Heart size={18} className="mx-auto text-neutral-400 stroke-[1.5]" />
              <p className="text-[11px] text-neutral-800 font-medium">Your wishlist is empty</p>
              <p className="text-[9px] text-neutral-500 max-w-[200px] mx-auto">
                Tap the heart on any product to save it.
              </p>
              <div className="pt-1">
                <Link
                  href="/products"
                  onClick={() => setIsWishlistOpen(false)}
                  className="inline-block px-3 py-1 bg-black text-white text-[10px] font-semibold rounded-md hover:bg-neutral-800 transition"
                >
                  Explore Drop 001
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 max-h-48 overflow-y-auto space-y-1">
              {wishlistItems.map((item) => (
                <div key={item.product_id} className="flex items-center gap-2.5 py-1.5">
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={() => setIsWishlistOpen(false)}
                    className="relative size-8 bg-neutral-100 rounded border border-neutral-200 shrink-0"
                  >
                    <Image src={item.thumbnail} alt={item.name} fill className="object-contain p-0.5" sizes="32px" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={() => setIsWishlistOpen(false)}
                      className="text-[11px] text-neutral-900 font-medium truncate block"
                    >
                      {item.name}
                    </Link>
                    <div className="text-[9px] text-neutral-500">₹{item.price.toLocaleString("en-IN")}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(true);
                        setIsWishlistOpen(false);
                      }}
                      className="px-2 py-0.5 bg-black text-white text-[9px] font-semibold rounded hover:bg-neutral-800 transition cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => removeWishlistItem(item.product_id)}
                      className="p-1 text-neutral-400 hover:text-red-500 transition cursor-pointer"
                      aria-label="Remove item"
                    >
                      <X size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── MOBILE BOTTOM FLOATING NAVIGATION BAR (INSPIRED BY REFERENCE) ─── */}
      <nav 
        aria-label="Mobile Navigation" 
        className="fixed bottom-4 inset-x-0 z-50 flex justify-center md:hidden pointer-events-none px-4 pb-[env(safe-area-inset-bottom,0px)]"
      >
        <div className="pointer-events-auto w-full max-w-[350px] h-[58px] rounded-full bg-[#1c1c1c]/95 backdrop-blur-2xl border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.7)] p-1.5 flex items-center justify-between font-sans select-none">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMobileTab === item.id;

            const content = (
              <div className="h-full flex items-center justify-center">
                {isActive ? (
                  <motion.div
                    layoutId="mobile-nav-active-pill"
                    className="h-full px-4 rounded-full bg-white text-black font-bold flex items-center gap-2 shadow-md shrink-0 select-none"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  >
                    <Icon className="size-[17px] text-black shrink-0" />
                    <span className="text-[12px] font-bold font-sans tracking-tight">{item.label}</span>
                  </motion.div>
                ) : (
                  <div className="relative p-2.5 text-white/75 hover:text-white transition-colors flex items-center justify-center">
                    <Icon className="size-5 transition-transform active:scale-95" />
                    {typeof item.badge === "number" && item.badge > 0 && (
                      <span className="absolute top-1 right-1 flex size-3.5 items-center justify-center rounded-full bg-white text-black text-[8px] font-bold font-sans ring-2 ring-[#1c1c1c]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsWishlistOpen(false);
                    setProfileMenuOpen(false);
                  }}
                  className={`h-full flex items-center justify-center cursor-pointer ${isActive ? "shrink-0" : "flex-1"}`}
                  aria-label={item.label}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                className={`h-full flex items-center justify-center cursor-pointer outline-none ${isActive ? "shrink-0" : "flex-1"}`}
                aria-label={item.label}
              >
                {content}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
