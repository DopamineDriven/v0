import type { Config as TailwindConfig } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import { zinc } from "tailwindcss/colors";

import uiPreset from "@dd/ui/tailwind.preset";

const gray = {
  "1000": "rgb(17,17,19)",
  "1100": "rgb(10,10,11)",
  ...zinc
} as const;

export default <TailwindConfig>{
  content: ["src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  presets: [uiPreset],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        "basis-grotesque-pro": ["var(--font-basis-grotesque-pro)"]
      },
      fontSize: {
        xxs: ["0.5rem", { lineHeight: "0.75rem" }]
      },

      colors: {
        gray
      },
      ringWidth: {
        3: "3px",
        5: "5px",
        6: "6px",
        7: "7px"
      },
      maxWidth: {
        "10xl": "173.75rem", // 2780 px
        "9xl": "121rem", // 1936px
        "8xl": "96rem" // 1536px
      },
      width: {
        "9xl": "120rem", // 1920px
        "8xl": "96rem" // 1536px
      },
      dropShadow: {
        testimonial: "1px 1px 5px 0px rgba(0, 0, 0, 0.84)"
      },
      boxShadow: {
        glow: "0 0 4px rgb(0 0 0 / 0.1)",
        refinement: "0px 2px 5px 0px #d7d7d7",
        testimonial: "5px 5px 5px 0px rgba(0, 0, 0, 0.35)",
        titleShadow: "0 1px 0 0 rgb(35 38 59 / 5%)",
        magical:
          "rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px",
        cardHover:
          "0 4px 4.1px rgba(0, 0, 0, 0.012),0 4.9px 5.8px rgba(0, 0, 0, 0.018),0 6.3px 8.4px rgba(0, 0, 0, 0.029),0 8.8px 12.9px rgba(0, 0, 0, 0.05),0 15px 23px rgba(0, 0, 0, 0.11)",
        activeShadow:
          "inset 0 1px 4px 0 rgb(119 122 175 / 40%), inset 0 1px 1px 0 rgb(119 122 175 / 40%), 0 1px 0 0 rgb(35 38 59 / 5%)"
      },
      keyframes: ({ theme }) => ({
        rerender: {
          "0%": {
            ["border-color"]: theme("colors.takeda.red")
          },
          "40%": {
            ["border-color"]: theme("colors.takeda.red")
          }
        },
        highlight: {
          "0%": {
            background: theme("colors.takeda.pink"),
            color: theme("colors.white")
          },
          "40%": {
            background: theme("colors.takeda.pink"),
            color: theme("colors.white")
          }
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        },
        loading: {
          "0%": {
            opacity: ".2"
          },
          "20%": {
            opacity: "1",
            transform: "translateX(1px)"
          },
          to: {
            opacity: ".2"
          }
        },
        wave: {
          "0%, 100%": {
            transform: "rotate(0)"
          },
          "20%, 60%": {
            transform: "rotate(-25deg)"
          },
          "40%, 80%": {
            transform: "rotate(10deg)"
          }
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)"
          }
        },
        translateXReset: {
          "100%": {
            transform: "translateX(0)"
          }
        },
        fadeToTransparent: {
          "0%": {
            opacity: "1"
          },
          "40%": {
            opacity: "1"
          },
          "100%": {
            opacity: "0"
          }
        }
      }),
      animation: {
        wiggle: "wiggle 10s ease-in-out infinite",
        hero: "hero 1s ease-in-out infinite",
        slowPing: "pulse 10s cubic-bezier(0, 0, 0.2, 1) infinite",
        slowWave: "wave 10s ease-in-out",
        wave: "wave 560ms ease-in-out"
      }
    }
  },
  plugins: [forms, typography]
};
