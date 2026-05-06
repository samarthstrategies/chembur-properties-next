import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A44A",
          light: "#E8C96A",
          dark: "#A07C2E",
        },
        navy: {
          DEFAULT: "#0B1B3D",
          deep: "#071430",
          rich: "#0E2452",
          light: "#1A3A6E",
          50: "#F0F3FA",
          100: "#E1E7F3",
          200: "#C3CFE7",
          300: "#8EA3CC",
          400: "#5A77B0",
          500: "#3B5998",
          600: "#1A3A6E",
          700: "#0E2452",
          800: "#0B1B3D",
          900: "#071430",
        },
        slate: {
          navy: "#6B7B99",
          dark: "#4A5C7A",
          light: "#94A3B8",
        },
        surface: {
          white: "#FFFFFF",
          cream: "#FAFBFD",
          light: "#F4F6FA",
          muted: "#EDF0F7",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 7vw, 6.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(2rem, 3.5vw, 3.2rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.5rem, 2.5vw, 2.2rem)", { lineHeight: "1.2" }],
        "label": ["0.68rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      animation: {
        "wa-pulse": "waPulse 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 0.6s ease both",
        "line-grow": "lineGrow 0.8s ease both",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
        "typing": "typing 4s steps(25, end) infinite alternate",
      },
      keyframes: {
        waPulse: {
          "0%, 100%": { boxShadow: "0 4px 20px rgba(37,211,102,0.4)" },
          "50%": { boxShadow: "0 4px 20px rgba(37,211,102,0.4), 0 0 0 8px rgba(37,211,102,0.1)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        lineGrow: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        typing: {
          "0%, 20%": { width: "0" },
          "80%, 100%": { width: "25ch" },
        },
      },
      maxWidth: {
        "8xl": "1320px",
        "7xl": "1120px",
      },
      boxShadow: {
        "card": "0 2px 20px rgba(11,27,61,0.06)",
        "card-hover": "0 12px 48px rgba(11,27,61,0.12)",
        "navy": "0 8px 32px rgba(11,27,61,0.2)",
        "gold": "0 8px 32px rgba(201,164,74,0.2)",
        "header": "0 1px 30px rgba(11,27,61,0.08)",
        "soft": "0 4px 24px rgba(11,27,61,0.05)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to bottom, rgba(11,27,61,0.4) 0%, rgba(11,27,61,0.85) 100%)",
        "navy-gradient": "linear-gradient(135deg, #0B1B3D 0%, #0E2452 50%, #071430 100%)",
        "navy-subtle": "linear-gradient(180deg, #0B1B3D 0%, #0E2452 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
