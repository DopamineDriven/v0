import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { BasisGrotesquePro } from "@/styles/fonts";
import "./index.css";

export const viewport = {
  themeColor: "#0a0a0a",
  userScalable: true,
  viewportFit: "auto",
  colorScheme: "light dark",
  initialScale: 1,
  maximumScale: 1,
  width: "device-width"
} satisfies Viewport;

export const metadata = {
  title: {
    default: "Turbo",
    template: "%s | Dopamine Driven"
  },
  referrer: "origin-when-cross-origin",
  appleWebApp: {
    capable: true,
    title: "Turbo",
    statusBarStyle: "black-translucent"
  },
  robots: {
    googleBot: {
      follow: false,
      index: false
    },
    follow: false,
    index: false
  }
} satisfies Metadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${BasisGrotesquePro.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
