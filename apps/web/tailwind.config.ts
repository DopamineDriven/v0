
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config as TailwindConfig } from "tailwindcss";
import animate from "tailwindcss-animate";

export default <TailwindConfig>{
  content: ["src/app/**/*.{js,ts,jsx,tsx}", "src/ui/**/*.{js,ts,jsx,tsx}"],
  // darkMode: ["class", 'html[class~="dark"]'],
  darkMode: "class",
  future: { hoverOnlyWhenSupported: true },
  theme: {
    screens: {
      xs: "375px",
      smxs: "507px",
      sm: "640px",
      md: "768px",
      mdlg: "896px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    extend: {
      fontFamily: {
        "gotham-pro": ["var(--font-gotham-pro)"],
        "gotham-pro-italic": ["var(--font-gotham-pro-italic)"],
        "gotham-pro-light": ["var(--font-gotham-pro-light)"],
        "gotham-pro-light-italic": ["var(--font-gotham-pro-light-italic)"],
        "gotham-pro-bold": ["var(--font-gotham-pro-bold)"],
        "gotham-pro-bold-italic": ["var(--font-gotham-pro-bold-italic)"],
        "gotham-pro-black": ["var(--font-gotham-pro-black)"],
        "gotham-pro-black-italic": ["var(--font-gotham-pro-black-italic)"],
        "gotham-pro-medium": ["var(--font-gotham-pro-medium)"],
        "gotham-pro-medium-italic": ["var(--font-gotham-pro-medium-italic)"]
      }
    }
  },
  plugins: [animate, forms, typography]
};
