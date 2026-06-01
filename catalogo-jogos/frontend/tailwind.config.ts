import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta "arcade noturno" — fundo profundo + acentos vibrantes
        base: {
          900: "#0d0f1a",
          800: "#141826",
          700: "#1c2133",
          600: "#262c42",
        },
        accent: {
          DEFAULT: "#ff5d73", // coral vibrante
          soft: "#ff8a9b",
        },
        neon: {
          DEFAULT: "#5eead4", // ciano/teal
          soft: "#99f6e4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px -4px rgba(94, 234, 212, 0.35)",
        card: "0 8px 30px -12px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
