import type { Metadata, Viewport } from "next";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: { icon: { url: "/logo/logo.svg", type: "image/svg+xml" } },
  title: { default: `${site.name} | Real estate in ${site.area}, ${site.city}`, template: `%s | ${site.name}` },
  description: `${site.broker} helps you buy, sell and rent homes, commercial spaces and plots in ${site.area}, ${site.city}.`,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Real estate in ${site.city}`,
    description: `Residential, commercial and plot listings across ${site.area}.`,
  },
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black">
          Skip to content
        </a>
        <SmoothScroll />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
