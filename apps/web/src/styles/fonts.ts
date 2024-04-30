import type { NextFontWithVariable } from "next/dist/compiled/@next/font/dist/types";
import localFont from "next/font/local";

export const BasisGrotesquePro = localFont<"--font-basis-grotesque-pro">({
  variable: "--font-basis-grotesque-pro",
  display: "swap",
  src: [
    {
      path: "../app/fonts/BasisGrotesquePro-Black.woff2",
      weight: "900",
      style: "normal"
    },
    {
      path: "../app/fonts/BasisGrotesquePro-BlackItalic.woff2",
      weight: "900",
      style: "italic"
    },
    {
      path: "../app/fonts/BasisGrotesquePro-Bold.woff2",
      weight: "700",
      style: "normal"
    },
    {
      path: "../app/fonts/BasisGrotesquePro-BoldItalic.woff2",
      weight: "700",
      style: "italic"
    },
    {
      path: "../app/fonts/BasisGrotesquePro-Light.woff2",
      weight: "300",
      style: "normal"
    },
    {
      path: "../app/fonts/BasisGrotesquePro-LightItalic.woff2",
      weight: "300",
      style: "italic"
    },
    {
      path: "../app/fonts/BasisGrotesquePro-Medium.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "../app/fonts/BasisGrotesquePro-MediumItalic.woff2",
      weight: "500",
      style: "italic"
    },
    {
      path: "../app/fonts/BasisGrotesquePro-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../app/fonts/BasisGrotesquePro-Italic.woff2",
      weight: "400",
      style: "italic"
    }
  ]
}) satisfies NextFontWithVariable;
