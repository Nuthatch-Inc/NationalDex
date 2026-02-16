import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { PwaLoadingScreen } from "@/components/pwa-loading-screen";
import { SITE_URL } from "@/lib/utils";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "nationaldex — The Pokedex App",
    template: "%s | nationaldex",
  },
  description:
    "Browse Pokemon stats, moves, abilities, items, type matchups, and more. Build teams, compare Pokemon, and explore all generations in one app.",
  keywords: [
    "pokedex",
    "pokemon",
    "nationaldex",
    "pokemon stats",
    "pokemon moves",
    "pokemon abilities",
    "pokemon types",
    "pokemon team builder",
    "pokemon type coverage",
    "pokemon comparison",
  ],
  manifest: "/manifest.json",
  openGraph: {
    siteName: "nationaldex",
    type: "website",
    locale: "en_US",
    title: "nationaldex — The Pokedex App",
    description:
      "Browse Pokemon stats, moves, abilities, items, type matchups, and more. Build teams and explore all generations.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "nationaldex — The Pokedex App",
    description:
      "Browse Pokemon stats, moves, abilities, items, type matchups, and more.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "nationaldex",
  },
  icons: {
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mono.variable} font-mono antialiased`}>
        <div
          id="pwa-loading-screen"
          className="pwa-loading-screen"
          aria-hidden="true"
        >
          <div className="pwa-loading-content">
            <div className="pwa-loading-title">nationaldex</div>
            <div className="pwa-loading-bar">
              <div className="pwa-loading-bar-fill" />
            </div>
          </div>
        </div>
        <PwaLoadingScreen />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
