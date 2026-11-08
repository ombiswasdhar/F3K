"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Heart, 
  MapPin, 
  User as UserIcon, 
  Ruler, 
  Lock, 
  LogOut, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  ChevronRight,
  ExternalLink,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";

type TabType =
  | "overview"
  | "orders"
  | "wishlist"
  | "addresses"
  | "profile"
  | "size-profile"
  | "security";

interface AddressItem {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const defaultAddresses: AddressItem[] = [
  {
    id: "addr_1",
    label: "Home • Primary",
    fullName: "Kenji Sato",
    phone: "+81 (0)3 5410 8820",
    address: "4-26-18 Jingumae, Shibuya-ku, Flat 4B",
    city: "Tokyo",
    state: "Tokyo Prefecture",
    pincode: "150-0001",
    isDefault: true,
  },
  {
    id: "addr_2",
    label: "Atelier Studio",
    fullName: "Kenji Sato",
    phone: "+91 98201 44820",
    address: "14th Road, Off Linking Road, Khar West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400052",
    isDefault: false,
  },
];

const mockF3KOrders = [
  {
    id: "ord_f3k_01",
    orderNumber: "F3K-9482",
    date: "Nov 02, 2026",
    status: "In Transit",
    statusBadgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    trackingCarrier: "DHL Express Global",
    trackingNumber: "DHL-8820491029",
    estimatedDelivery: "Today, by 7:00 PM",
    totalAmount: 11398,
    paymentMethod: "Credit Card ending in 4242",
    shippingAddress: "4-26-18 Jingumae, Shibuya-ku, Flat 4B, Tokyo 150-0001",
    items: [
      {
        id: "item_01",
        name: "ARCH-01 Architectural Panel Tee",
        slug: "arch-01-panel-tee",
        color: "Obsidian Charcoal",
        size: "L",
        quantity: 1,
        price: 3400,
        image: "/products/f3k/ARCH-01/front.png",
      },
      {
        id: "item_02",
        name: "CROT-01 Orbital Signal Washed Tee",
        slug: "crot-01-orbital-tee",
        color: "Carbon Slate",
        size: "L",
        quantity: 1,
        price: 3200,
        image: "/products/f3k/CROT 01/front.png",
      },
    ],
  },
  {
    id: "ord_f3k_02",
    orderNumber: "F3K-7120",
    date: "Oct 19, 2026",
    status: "Delivered",
    statusBadgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    trackingCarrier: "DHL Express",
    trackingNumber: "DHL-4910398411",
    estimatedDelivery: "Delivered on Oct 22, 2026",
    totalAmount: 3400,
    paymentMethod: "Apple Pay",
    shippingAddress: "4-26-18 Jingumae, Shibuya-ku, Flat 4B, Tokyo 150-0001",
    items: [
      {
        id: "item_03",
        name: "MONOLITH-01 Stonewashed Architectural Tee",
        slug: "monolith-01-stonewashed-tee",
        color: "Warm Greige",
        size: "L",
        quantity: 1,
        price: 3400,
        image: "/products/f3k/MONOLITH 01/front.png",
      },
    ],
  },
];

export default function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const { items: cartItems, addItem: addToCart, setIsOpen: setCartOpen } = useCartStore();
  const { items: wishlistItems, removeItem: removeFromWishlist } = useWishlistStore();

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [selectedTrackOrder, setSelectedTrackOrder] = useState<any | null>(null);

  // Profile local state
  const [profile, setProfile] = useState({
    name: "Kenji Sato",
    email: "collector@f3k.com",
    phone: "+81 (0)3 5410 8820",
    gender: "Unisex • Menswear",
    fitPreference: "Boxy Oversized",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  // Address state
  const [addresses, setAddresses] = useState<AddressItem[]>(defaultAddresses);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState<Omit<AddressItem, "id">>({
    label: "Studio",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  // Size calculator state
  const [sizeProfile, setSizeProfile] = useState({
    height: 180,
    weight: 76,
    fit: "oversized",
  });
  const [sizeSaved, setSizeSaved] = useState(false);

  // Security tab state
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [securitySaved, setSecuritySaved] = useState(false);

  // Sync tab from search parameter
  useEffect(() => {
    const tabParam = searchParams?.get("tab");
    if (tabParam && ["overview", "orders", "wishlist", "addresses", "profile", "size-profile", "security"].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    }
  }, [searchParams]);

  // Load saved profile & addresses from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("f3k-client-profile");
      if (savedProfile) {
        try {
          setProfile(JSON.parse(savedProfile));
        } catch (e) {
          console.error(e);
        }
      } else if (clerkUser) {
        setProfile((prev) => ({
          ...prev,
          name: clerkUser.fullName || prev.name,
          email: clerkUser.primaryEmailAddress?.emailAddress || prev.email,
        }));
      }

      const savedAddresses = localStorage.getItem("f3k-client-addresses");
      if (savedAddresses) {
        try {
          setAddresses(JSON.parse(savedAddresses));
        } catch (e) {
          console.error(e);
        }
      }

      const savedSize = localStorage.getItem("f3k-client-sizing");
      if (savedSize) {
        try {
          setSizeProfile(JSON.parse(savedSize));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [clerkUser]);

  // Handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("f3k-client-profile", JSON.stringify(profile));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleSaveSize = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("f3k-client-sizing", JSON.stringify(sizeProfile));
    setSizeSaved(true);
    setTimeout(() => setSizeSaved(false), 2500);
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setSecuritySaved(true);
    setSecurityForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setSecuritySaved(false), 2500);
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: AddressItem = {
      ...newAddressForm,
      id: `addr_${Date.now()}`,
    };
    const updated = newAddr.isDefault 
      ? [newAddr, ...addresses.map(a => ({ ...a, isDefault: false }))]
      : [...addresses, newAddr];
    
    setAddresses(updated);
    localStorage.setItem("f3k-client-addresses", JSON.stringify(updated));
    setIsAddingAddress(false);
    setNewAddressForm({
      label: "Studio",
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem("f3k-client-addresses", JSON.stringify(updated));
  };

  const handleSetDefaultAddress = (id: string) => {
    const updated = addresses.map(a => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(updated);
    localStorage.setItem("f3k-client-addresses", JSON.stringify(updated));
  };

  const handleSignOut = async () => {
    if (signOut) {
      await signOut();
    }
    router.push("/");
  };

  // Filtered orders
  const filteredOrders = mockF3KOrders.filter((ord) => {
    if (!orderSearchQuery.trim()) return true;
    const q = orderSearchQuery.toLowerCase().trim();
    return (
      ord.orderNumber.toLowerCase().includes(q) ||
      ord.items.some(i => i.name.toLowerCase().includes(q) || i.color.toLowerCase().includes(q))
    );
  });

  // Calculate recommended size
  const getRecommendedSize = (h: number, w: number, fit: string) => {
    if (w < 65) return fit === "oversized" ? "M" : "S";
    if (w < 78) return fit === "oversized" ? "L" : "M";
    if (w < 90) return fit === "oversized" ? "XL" : "L";
    return "XXL";
  };

  const recommendedSize = getRecommendedSize(sizeProfile.height, sizeProfile.weight, sizeProfile.fit);

  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="w-full font-sans text-neutral-900 pb-16">
      {/* 1. Account Header Banner (Clean & Light) */}
      <div className="mb-8 pb-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-14 sm:size-16 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-xs">
            {profile.name.charAt(0) || "K"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                {profile.name}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-sans font-medium text-neutral-600 uppercase">
                Drop 001 Member
              </span>
            </div>
            <div className="text-xs text-neutral-500 font-sans mt-0.5 flex items-center gap-3">
              <span>{profile.email}</span>
              <span>•</span>
              <span className="font-sans text-[11px] text-neutral-400">ID: #F3K-8842</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/returns"
            className="text-xs font-semibold px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition text-neutral-800 flex items-center gap-1.5"
          >
            <RotateCcw size={13} />
            <span>Returns &amp; Refunds</span>
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-xs font-semibold px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition text-neutral-600 flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 2. Main Dashboard Layout (Sidebar + Content) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Navigation Sidebar (3 cols) */}
        <aside className="md:col-span-4 lg:col-span-3 space-y-1 bg-white p-2 sm:p-3 rounded-2xl border border-neutral-200/90 shadow-2xs">
          {[
            { id: "overview", label: "Account Overview", icon: LayoutDashboard },
            { id: "orders", label: "Orders & Tracking", icon: Package, badge: mockF3KOrders.length },
            { id: "wishlist", label: "Saved Wishlist", icon: Heart, badge: wishlistItems.length },
            { id: "addresses", label: "Shipping Addresses", icon: MapPin },
            { id: "profile", label: "Profile & Details", icon: UserIcon },
            { id: "size-profile", label: "Fit & Sizing Profile", icon: Ruler },
            { id: "security", label: "Password & Security", icon: Lock },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? "bg-neutral-900 text-white shadow-xs font-semibold"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={15} className={isActive ? "text-white" : "text-neutral-500"} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans ${
                    isActive ? "bg-white text-black font-bold" : "bg-neutral-100 text-neutral-600"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 mt-3 border-t border-neutral-100 px-3 py-2 text-[11px] text-neutral-400 font-sans">
            <span>Client Care Desk</span>
            <div className="mt-1 text-neutral-600 font-sans font-medium text-xs">
              <Link href="/#contact" className="text-black hover:underline flex items-center gap-1">
                <span>Atelier Concierge</span>
                <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </aside>

        {/* Right Content Area (9 cols) */}
        <main className="md:col-span-8 lg:col-span-9 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-2xs">
          
          {/* ================= TAB 1: OVERVIEW ================= */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Quick Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div 
                  onClick={() => setActiveTab("orders")}
                  className="p-4 rounded-xl border border-neutral-200 bg-[#fafaf8] hover:bg-neutral-50 transition cursor-pointer"
                >
                  <div className="text-[11px] font-sans text-neutral-500 uppercase">Orders</div>
                  <div className="text-2xl font-bold text-neutral-900 mt-1">{mockF3KOrders.length}</div>
                  <div className="text-[10px] text-blue-600 font-medium mt-0.5">1 in transit</div>
                </div>

                <div 
                  onClick={() => setActiveTab("wishlist")}
                  className="p-4 rounded-xl border border-neutral-200 bg-[#fafaf8] hover:bg-neutral-50 transition cursor-pointer"
                >
                  <div className="text-[11px] font-sans text-neutral-500 uppercase">Saved Items</div>
                  <div className="text-2xl font-bold text-neutral-900 mt-1">{wishlistItems.length}</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Locker items</div>
                </div>

                <div 
                  onClick={() => setCartOpen(true)}
                  className="p-4 rounded-xl border border-neutral-200 bg-[#fafaf8] hover:bg-neutral-50 transition cursor-pointer"
                >
                  <div className="text-[11px] font-sans text-neutral-500 uppercase">Cart Bag</div>
                  <div className="text-2xl font-bold text-neutral-900 mt-1">{cartCount}</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Ready to checkout</div>
                </div>

                <div 
                  onClick={() => router.push("/returns")}
                  className="p-4 rounded-xl border border-neutral-200 bg-[#fafaf8] hover:bg-neutral-50 transition cursor-pointer"
                >
                  <div className="text-[11px] font-sans text-neutral-500 uppercase">Policy</div>
                  <div className="text-2xl font-bold text-neutral-900 mt-1">14d</div>
                  <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Free doorstep pickup</div>
                </div>
              </div>

              {/* Active Order Spotlight */}
              <div className="border border-neutral-200 rounded-xl p-5 bg-[#fbfbfa] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Active Shipment: Order #F3K-9482
                    </span>
                  </div>
                  <span className="text-[10px] font-sans bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">
                    Out for Delivery
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-neutral-200/80">
                  <div className="flex items-center gap-3">
                    <div className="relative size-14 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                      <Image
                        src="/products/f3k/ARCH-01/front.png"
                        alt="T-shirt"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-900">
                        ARCH-01 Architectural Panel Tee (Obsidian Charcoal) + 1 more
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-sans mt-0.5">
                        Carrier: DHL Express &bull; Est. Arrival: Today, by 7:00 PM
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedTrackOrder(mockF3KOrders[0])}
                    className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition cursor-pointer shrink-0"
                  >
                    Track Shipment →
                  </button>
                </div>
              </div>

              {/* Default Address & Fit Quick Look */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Default Address */}
                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans text-neutral-500 uppercase">Default Address</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("addresses")}
                      className="text-[11px] text-neutral-900 hover:underline font-semibold"
                    >
                      Manage
                    </button>
                  </div>
                  <div className="text-xs font-semibold text-neutral-900">{addresses[0]?.fullName}</div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {addresses[0]?.address}, {addresses[0]?.city}, {addresses[0]?.pincode}
                  </p>
                  <p className="text-xs text-neutral-500 font-sans">{addresses[0]?.phone}</p>
                </div>

                {/* Recommended Fit */}
                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans text-neutral-500 uppercase">Drop 001 Fit Profile</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("size-profile")}
                      className="text-[11px] text-neutral-900 hover:underline font-semibold"
                    >
                      Update
                    </button>
                  </div>
                  <div className="text-xs font-semibold text-neutral-900">
                    Recommended Size: <span className="text-black font-bold font-sans">Size {recommendedSize}</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Calibrated for 500 GSM loopback cotton boxy drape at {sizeProfile.height}cm, {sizeProfile.weight}kg.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: ORDERS & TRACKING ================= */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold uppercase tracking-tight text-neutral-900">
                    Orders &amp; Shipments
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Review and track your Drop 001 numbered piece deliveries.
                  </p>
                </div>

                {/* Order Search Box */}
                <div className="relative w-full sm:w-60">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Search by order # or t-shirt..."
                    className="w-full pl-8 pr-3 py-1.5 bg-[#f5f5f3] border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Order Cards List */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="py-12 text-center text-xs text-neutral-500 font-sans">
                    No matching orders found.
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="border border-neutral-200 rounded-xl p-5 bg-white space-y-4 hover:border-neutral-300 transition"
                    >
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-bold font-sans text-neutral-900">
                            #{order.orderNumber}
                          </span>
                          <span className="text-neutral-400">•</span>
                          <span className="text-neutral-500">{order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold border ${order.statusBadgeColor}`}>
                            {order.status}
                          </span>
                          <span className="font-sans font-bold text-neutral-900 text-sm">
                            ₹{order.totalAmount.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      {/* Items in this Order */}
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="relative size-12 rounded-lg bg-[#f8f8f6] border border-neutral-200 overflow-hidden shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                              <div>
                                <Link
                                  href={`/products/${item.slug}`}
                                  className="text-xs font-semibold text-neutral-900 hover:underline"
                                >
                                  {item.name}
                                </Link>
                                <div className="text-[11px] text-neutral-500 font-sans mt-0.5">
                                  <span>Size: {item.size}</span> &bull; <span>{item.color}</span> &bull; <span>Qty: {item.quantity}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-xs font-sans font-medium text-neutral-900">
                              ₹{item.price.toLocaleString("en-IN")}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer Actions */}
                      <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-[11px] text-neutral-500 font-sans">
                          {order.estimatedDelivery}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedTrackOrder(order)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-black text-white transition cursor-pointer flex items-center gap-1.5"
                          >
                            <Truck size={13} />
                            <span>Track Parcel</span>
                          </button>
                          <Link
                            href="/returns"
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition"
                          >
                            Return or Exchange
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 3: WISHLIST ================= */}
          {activeTab === "wishlist" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold uppercase tracking-tight text-neutral-900">
                    Saved Locker // Wishlist
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Saved heavyweight t-shirts and priority drop pieces.
                  </p>
                </div>
                <span className="text-xs font-sans text-neutral-500">
                  {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
                </span>
              </div>

              {wishlistItems.length === 0 ? (
                <div className="py-14 text-center space-y-3 font-sans border border-dashed border-neutral-200 rounded-2xl">
                  <Heart size={28} className="mx-auto text-neutral-300" />
                  <div className="text-sm font-bold uppercase tracking-tight text-neutral-900">
                    Your Saved Locker Is Empty
                  </div>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Save your preferred Drop 001 heavyweight streetwear t-shirts by tapping the heart icon on any product page.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/products"
                      className="inline-block px-5 py-2.5 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition"
                    >
                      Browse Drop 001 T-Shirts →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistItems.map((item) => (
                    <div 
                      key={item.id}
                      className="border border-neutral-200 rounded-xl p-4 bg-white flex items-center justify-between gap-3 hover:border-neutral-300 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative size-16 rounded-lg bg-[#f8f8f6] border border-neutral-200 overflow-hidden shrink-0">
                          <Image
                            src={item.image || item.thumbnail || "/logo/f3k-mark-black.png"}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-neutral-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-neutral-500 font-sans mt-0.5">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart({
                              id: item.id,
                              product_id: item.product_id,
                              name: item.name,
                              slug: item.slug,
                              price: item.price,
                              thumbnail: item.thumbnail || item.image || "/logo/f3k-mark-black.png",
                              color: "Default",
                              size: "L",
                            });
                            setCartOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition cursor-pointer"
                        >
                          Add to Bag
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(item.product_id)}
                          aria-label="Remove item"
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: ADDRESSES ================= */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold uppercase tracking-tight text-neutral-900">
                    Shipping Coordinates
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Manage your delivery addresses for express global dispatch.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Plus size={13} />
                  <span>Add Address</span>
                </button>
              </div>

              {/* Add New Address Form */}
              {isAddingAddress && (
                <form onSubmit={handleAddNewAddress} className="p-5 border border-neutral-300 rounded-xl bg-[#fafaf8] space-y-3 text-xs">
                  <div className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-2">
                    New Delivery Coordinates
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-sans uppercase text-neutral-500 mb-1">Address Label</label>
                      <input
                        type="text"
                        required
                        value={newAddressForm.label}
                        onChange={(e) => setNewAddressForm({ ...newAddressForm, label: e.target.value })}
                        placeholder="e.g. Home, Studio, Tokyo Office"
                        className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans uppercase text-neutral-500 mb-1">Recipient Name</label>
                      <input
                        type="text"
                        required
                        value={newAddressForm.fullName}
                        onChange={(e) => setNewAddressForm({ ...newAddressForm, fullName: e.target.value })}
                        placeholder="Full Name"
                        className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-sans uppercase text-neutral-500 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={newAddressForm.phone}
                        onChange={(e) => setNewAddressForm({ ...newAddressForm, phone: e.target.value })}
                        placeholder="+81 or +91..."
                        className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans uppercase text-neutral-500 mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={newAddressForm.pincode}
                        onChange={(e) => setNewAddressForm({ ...newAddressForm, pincode: e.target.value })}
                        placeholder="Postal Code"
                        className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans uppercase text-neutral-500 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={newAddressForm.address}
                      onChange={(e) => setNewAddressForm({ ...newAddressForm, address: e.target.value })}
                      placeholder="Building, Street, Landmark"
                      className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-sans uppercase text-neutral-500 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={newAddressForm.city}
                        onChange={(e) => setNewAddressForm({ ...newAddressForm, city: e.target.value })}
                        placeholder="City"
                        className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans uppercase text-neutral-500 mb-1">State or Region</label>
                      <input
                        type="text"
                        required
                        value={newAddressForm.state}
                        onChange={(e) => setNewAddressForm({ ...newAddressForm, state: e.target.value })}
                        placeholder="State"
                        className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-4 py-2 rounded-lg border border-neutral-300 text-xs font-semibold hover:bg-neutral-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-black text-white text-xs font-semibold hover:bg-neutral-800"
                    >
                      Save Coordinates
                    </button>
                  </div>
                </form>
              )}

              {/* Saved Addresses Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div 
                    key={addr.id}
                    className={`p-5 rounded-xl border transition space-y-2.5 ${
                      addr.isDefault 
                        ? "border-black bg-white shadow-xs" 
                        : "border-neutral-200 bg-[#fafaf8] hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs uppercase tracking-wider text-neutral-900">
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[9px] font-sans bg-black text-white px-2 py-0.5 rounded font-semibold uppercase">
                            Primary
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-neutral-400 hover:text-red-500 transition p-1"
                        title="Delete address"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="text-xs font-semibold text-neutral-900">{addr.fullName}</div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {addr.address}<br />
                      {addr.city}, {addr.state} &bull; {addr.pincode}
                    </p>
                    <div className="text-xs text-neutral-500 font-sans pt-1">
                      {addr.phone}
                    </div>

                    {!addr.isDefault && (
                      <div className="pt-2 border-t border-neutral-200/70">
                        <button
                          type="button"
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className="text-xs font-semibold text-neutral-900 hover:underline cursor-pointer"
                        >
                          Set as primary delivery address
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: PROFILE ================= */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold uppercase tracking-tight text-neutral-900">
                  Profile &amp; Personal Details
                </h2>
                <p className="text-xs text-neutral-500">
                  Manage your personal atelier identity and preferences.
                </p>
              </div>

              {profileSaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  <span>Profile changes successfully updated.</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-sans max-w-lg">
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-wider text-neutral-500 mb-1 font-semibold">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-[#f8f8f6] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-wider text-neutral-500 mb-1 font-semibold">
                    Email Address (Registered)
                  </label>
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-[#f8f8f6] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-wider text-neutral-500 mb-1 font-semibold">
                    Phone or WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-[#f8f8f6] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-wider text-neutral-500 mb-1 font-semibold">
                    Preferred Garment Category
                  </label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    className="w-full bg-[#f8f8f6] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  >
                    <option value="Unisex • Menswear">Unisex • Menswear Heavyweight</option>
                    <option value="Womenswear">Womenswear Architectural</option>
                    <option value="All Categories">All Atelier Categories</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= TAB 6: FIT & SIZING PROFILE ================= */}
          {activeTab === "size-profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold uppercase tracking-tight text-neutral-900">
                  Fit &amp; Sizing Profile
                </h2>
                <p className="text-xs text-neutral-500">
                  Precision-calibrated for FUTURE3000 Drop 001 500 GSM loopback cotton silhouettes.
                </p>
              </div>

              {sizeSaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  <span>Sizing profile saved and synced with Drop 001 recommendation engine.</span>
                </div>
              )}

              {/* Recommended Size Display Card */}
              <div className="p-6 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-sans text-neutral-400 uppercase tracking-widest">
                    Recommended F3K Size
                  </div>
                  <div className="text-4xl font-extrabold tracking-tight font-sans text-white">
                    SIZE {recommendedSize}
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed max-w-md pt-1">
                    Based on your silhouette specifications ({sizeProfile.height} cm, {sizeProfile.weight} kg), 
                    Size {recommendedSize} delivers the intended architectural boxy drape without clinging.
                  </p>
                </div>
                <div className="shrink-0 p-3 rounded-xl bg-white/10 border border-white/15 text-center font-sans text-xs">
                  <div className="text-neutral-400 text-[10px]">Fabric Weight</div>
                  <div className="text-white font-bold text-sm mt-0.5">500 GSM</div>
                </div>
              </div>

              {/* Sliders & Fit Form */}
              <form onSubmit={handleSaveSize} className="space-y-5 text-xs max-w-lg">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-sans uppercase text-neutral-500 font-semibold">Height</label>
                    <span className="font-sans font-bold text-neutral-900">{sizeProfile.height} cm</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="210"
                    value={sizeProfile.height}
                    onChange={(e) => setSizeProfile({ ...sizeProfile, height: Number(e.target.value) })}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-sans uppercase text-neutral-500 font-semibold">Weight</label>
                    <span className="font-sans font-bold text-neutral-900">{sizeProfile.weight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="45"
                    max="130"
                    value={sizeProfile.weight}
                    onChange={(e) => setSizeProfile({ ...sizeProfile, weight: Number(e.target.value) })}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase text-neutral-500 font-semibold mb-2">
                    Drape &amp; Fit Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "slim", label: "True to Size" },
                      { id: "regular", label: "Relaxed Fit" },
                      { id: "oversized", label: "Boxy Oversized" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSizeProfile({ ...sizeProfile, fit: f.id })}
                        className={`py-2 px-3 rounded-xl border text-xs font-medium transition cursor-pointer ${
                          sizeProfile.fit === f.id
                            ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                            : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Save Size Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= TAB 7: SECURITY ================= */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold uppercase tracking-tight text-neutral-900">
                  Password &amp; Security
                </h2>
                <p className="text-xs text-neutral-500">
                  Protect your atelier membership and payment credentials.
                </p>
              </div>

              {securitySaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  <span>Security settings and password successfully updated.</span>
                </div>
              )}

              <form onSubmit={handleSaveSecurity} className="space-y-4 text-xs font-sans max-w-lg">
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-wider text-neutral-500 mb-1 font-semibold">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={securityForm.currentPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                    className="w-full bg-[#f8f8f6] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-wider text-neutral-500 mb-1 font-semibold">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={securityForm.newPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                    className="w-full bg-[#f8f8f6] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-wider text-neutral-500 mb-1 font-semibold">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={securityForm.confirmPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                    className="w-full bg-[#f8f8f6] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Update Password
                  </button>
                </div>
              </form>

              {/* Danger Zone: Sign out */}
              <div className="pt-8 border-t border-neutral-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-red-200 bg-red-50/40">
                  <div>
                    <h4 className="text-xs font-bold text-red-900 uppercase tracking-wider">
                      Sign Out of All Sessions
                    </h4>
                    <p className="text-xs text-red-700/80 mt-0.5">
                      Terminates your current session and locks your private locker privileges.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer shrink-0"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* 3. TRACKING MODAL (Clean, Light & Minimal) */}
      {selectedTrackOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-sans">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight text-neutral-900">
                  Shipment Tracker &bull; #{selectedTrackOrder.orderNumber}
                </h3>
                <div className="text-[11px] text-neutral-500 font-sans">
                  Carrier: {selectedTrackOrder.trackingCarrier} &bull; {selectedTrackOrder.trackingNumber}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTrackOrder(null)}
                aria-label="Close modal"
                className="p-1 text-neutral-400 hover:text-black transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-xs">
              {/* Status Banner */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-sans uppercase text-blue-600">Current Status</div>
                  <div className="text-sm font-bold text-blue-950 mt-0.5">{selectedTrackOrder.status}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-sans text-blue-600">Expected Arrival</div>
                  <div className="text-xs font-bold text-blue-950 mt-0.5">{selectedTrackOrder.estimatedDelivery}</div>
                </div>
              </div>

              {/* Shipment Timeline */}
              <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 size-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  <div className="font-bold text-neutral-900">Order Confirmed &amp; Serialized</div>
                  <div className="text-[10px] text-neutral-500 font-sans">Tokyo Atelier &bull; Drop 001 Number Tag Attached</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-6 top-0.5 size-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  <div className="font-bold text-neutral-900">Quality Assured &amp; Dispatched</div>
                  <div className="text-[10px] text-neutral-500 font-sans">500 GSM Loopback Cotton Inspection Completed</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-6 top-0.5 size-3 rounded-full bg-blue-500 ring-4 ring-blue-100 animate-pulse" />
                  <div className="font-bold text-blue-900">Out for Doorstep Delivery</div>
                  <div className="text-[10px] text-neutral-500 font-sans">Courier Driver En Route &bull; Expected by 7:00 PM</div>
                </div>

                <div className="relative opacity-40">
                  <div className="absolute -left-6 top-0.5 size-3 rounded-full bg-neutral-300" />
                  <div className="font-semibold text-neutral-700">Delivered &amp; Signed</div>
                  <div className="text-[10px] text-neutral-400 font-sans">Pending Delivery Confirmation</div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="p-3.5 rounded-xl border border-neutral-100 bg-neutral-50 space-y-1">
                <div className="text-[10px] font-sans text-neutral-400 uppercase">Delivery Destination</div>
                <div className="text-neutral-700 leading-relaxed font-sans">{selectedTrackOrder.shippingAddress}</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs">
              <Link
                href="/returns"
                onClick={() => setSelectedTrackOrder(null)}
                className="text-neutral-600 hover:text-black font-medium"
              >
                14-Day Return Policy →
              </Link>
              <button
                type="button"
                onClick={() => setSelectedTrackOrder(null)}
                className="px-4 py-1.5 rounded-lg bg-neutral-900 text-white font-semibold hover:bg-black transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
