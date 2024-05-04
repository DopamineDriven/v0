import type { Config as TailwindConfig } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
import { zinc } from "tailwindcss/colors";

const customColors = {
  blue: "#2882ef",
  lightblue: "#2882ef",
  rosa: "#f02888",
  yellow: "#f9c32a",
  orange: "#f97449",
  "akane-red": "#ea5532",
  "sakura-pink": "#da5283",
  "fuji-purple": "#9b72b0",
  "sorairo-blue": "#4c9bcf",
  "asagi-blue": "#51b1bf",
  "matsuba-green": "#abb436",
  "yamabuki-yellow": "#eba800",
  "azuki-maroon": "#891515",
  accents: {
    0: "#fff",
    1: "#fafafa",
    2: "#eaeaea",
    3: "#999",
    4: "#888",
    5: "#666",
    6: "#444",
    7: "#333",
    8: "#111",
    9: "#000"
  },
  success: {
    DEFAULT: "#0070f3",
    dark: "#0761d1",
    light: "#3291ff",
    lighter: "#d3e5ff"
  },
  error: {
    DEFAULT: "#e00",
    dark: "#c50000",
    light: "#ff1a1a",
    lighter: "#f7d4d6"
  },
  warning: {
    DEFAULT: "#f5a623",
    dark: "#ab570a",
    light: "#f7b955",
    lighter: "#ffefcf"
  },
  violet: {
    DEFAULT: "#7928ca",
    dark: "#4c2889",
    light: "#8a63d2",
    lighter: "#e3d7fc"
  },
  cyan: {
    DEFAULT: "#50e3c2",
    dark: "#29bc9b",
    light: "#79ffe1",
    lighter: "#aaffec"
  },
  highlight: {
    purple: "#f81ce5",
    magenta: "#eb367f",
    pink: "#ff0080",
    yellow: "#fff500"
  },
  flirt: {
    50: "#FFF0FD",
    100: "#FFE3FC",
    200: "#FFC7FA",
    300: "#FF9AF3",
    400: "#FF5CE8",
    500: "#FF2CD8",
    600: "#FA08BD",
    700: "#DA009A",
    800: "#AC0079",
    900: "#95066A",
    950: "#5D003D"
  },
  "stone-mist": {
    50: "#F6F6F7",
    100: "#EEEFF1",
    200: "#E1E1E4",
    300: "#CECFD3",
    400: "#B9B9C0",
    500: "#A5A6AF",
    600: "#9797A1",
    700: "#7C7C86",
    800: "#66666D",
    900: "#55555A",
    950: "#323135"
  },
  foreground: "#000",
  background: "#fff",
  "text-color": "var(--textColor)",
  primary: "var(--colorPrimary)",
  "primary-contrast": "var(--colorPrimaryContrast)",
  "primary-active": "var(--colorPrimaryActive)",
  "primary-active-contrast": "var(--colorPrimaryActiveContrast)",
  secondary: "var(--colorSecondary)",
  "secondary-contrast": "var(--colorSecondaryContrast)",
  "light-grey": "var(--colorLightGrey)",
  "light-grey-contrast": "var(--colorLightGreyContrast)",
  "medium-grey": "var(--colorMediumGrey)",
  "medium-grey-contrast": "var(--colorMediumGreyContrast)",
  "dark-grey": "var(--colorDarkGrey)",
  "dark-grey-contrast": "var(--colorDarkGreyContrast)"
};

const gray = {
  ...zinc,
  "1000": "#111113",
  "1100": "#0a0a0b"
} as const;

export default <TailwindConfig>{
  content: ["src/**/*.{js,ts,jsx,tsx,css}"],
  prefix: "ddui-",
  darkMode: "class",
  corePlugins: {
    // setting this to true emits html/global styles that
    // could conflict with styles designated by consumers
    preflight: false
  },
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontSize: {
        xxs: ["0.5rem", { lineHeight: "0.75rem" }]
      },
      colors: {
        ...customColors,
        selection: customColors.cyan.light,
        link: {
          DEFAULT: customColors.success.DEFAULT,
          light: customColors.success.light
        },
        code: customColors.rosa,
        secondary: {
          DEFAULT: customColors.accents[5],
          dark: customColors.accents[7],
          light: customColors.accents[3],
          lighter: customColors.accents[2]
        },
        gray
      },
      ringWidth: {
        3: "3px",
        5: "5px",
        6: "6px",
        7: "7px"
      },
      maxWidth: {
        "10xl": "150rem", // 2400px
        "9xl": "120rem", // 1920px
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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "slide-from-left": {
          "0%": {
            transform: "translateX(-100%)"
          },
          "100%": {
            transform: "translateX(0)"
          }
        },
        "slide-to-left": {
          "0%": {
            transform: "translateX(0)"
          },
          "100%": {
            transform: "translateX(-100%)"
          }
        },
        rerender: {
          "0%": {
            ["border-color"]: theme("colors.stone-mist.500")
          },
          "40%": {
            ["border-color"]: theme("colors.stone-mist.600")
          }
        },
        highlight: {
          "0%": {
            background: theme("colors.flirt.700"),
            color: theme("colors.white")
          },
          "40%": {
            background: theme("colors.flirt.800"),
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
        wave: "wave 560ms ease-in-out",
        "slide-from-left":
          "slide-from-left 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895)",
        "slide-to-left":
          "slide-to-left 0.25s cubic-bezier(0.82, 0.085, 0.395, 0.895)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [animate, forms, typography]
};
