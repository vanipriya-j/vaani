import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F6F3",
        ink: {
          DEFAULT: "#0F1C2E",
          soft: "#3A4658",
          muted: "#6B7380",
        },
        accent: {
          DEFAULT: "#3F4FD9",
          soft: "#E8EAFB",
        },
        warn: {
          DEFAULT: "#C47B16",
          soft: "#FFF4E5",
        },
        blocked: {
          DEFAULT: "#C0392B",
          soft: "#FDECEA",
        },
        grounded: {
          DEFAULT: "#1F7A4D",
          soft: "#E8F6EE",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        panel: "0 18px 50px rgba(15, 28, 46, 0.12)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.35s ease-out both",
        "fade-in": "fade-in 0.3s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
