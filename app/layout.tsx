import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ClerkProvider } from "@clerk/nextjs";
import { RealityProvider } from "@/context/RealityThemeContext";
import DripegoLoader from "@/components/dripego/DripegoLoader";
import TechnicalGridBackground from "@/components/sutera/TechnicalGridBackground";
import CartDrawer from "@/components/CartDrawer";
import CartToast from "@/components/CartToast";

export const metadata: Metadata = {
  title: "F3K • FUTURE 3000 • Heavyweight Streetwear",
  description:
    "Heavyweight streetwear constructed with multi-panel cut-and-sew cotton. Built with 280 to 500 GSM combed fabrics in India.",
  metadataBase: new URL("https://future3000.com"),
  openGraph: {
    title: "F3K • FUTURE 3000 • Heavyweight Cut-and-Sew",
    description:
      "Heavyweight streetwear constructed with multi-panel cut-and-sew cotton. Built with 280 to 500 GSM combed fabrics in India.",
    siteName: "FUTURE 3000 • F3K",
    images: [
      {
        url: "/models/hero_model.png",
        width: 2048,
        height: 1365,
        alt: "F3K Drop 001 Campaign",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "F3K • FUTURE 3000 • Heavyweight Cut-and-Sew",
    description:
      "Heavyweight streetwear built from dense combed cotton and stitched multi-panel patterns.",
    images: ["/models/hero_model.png"],
  },
  icons: {
    icon: "/logo/f3k-mark-black.png",
    shortcut: "/logo/f3k-mark-black.png",
    apple: "/logo/f3k-mark-black.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full scroll-smooth" data-reality="lab-light">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62.5..125,100..900;1,62.5..125,100..900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="min-h-full antialiased transition-colors duration-400">
          <DripegoLoader />
          <RealityProvider>
            <SmoothScroll />
            <CartToast />
            <CartDrawer />
            {children}
          </RealityProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
