import type { Metadata } from "next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { DEFAULT_THEME, THEME_INIT_SCRIPT } from "@/lib/theme";
import { BottomNav } from "@/components/BottomNav";
import { TopBar } from "@/components/TopBar";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nichetack.vercel.app"),
  title: {
    default: "Nichetack — personal commerce CRM",
    template: "%s · Nichetack",
  },
  description:
    "A calm home for everything you've saved across the web — weigh it, rank it, decide.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${geist.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        {/* Apply the stored theme before first paint — no flash of default. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <TopBar />
        <main className="flex-1">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
