import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#0a0b1e",
          deep: "#06071a",
          soft: "#13152e",
        },
        royal: {
          DEFAULT: "#1a1340",
          light: "#2a2160",
        },
        gold: {
          DEFAULT: "#c9a84c",
          light: "#f5e27d",
          dark: "#7d5a00",
        },
        violet: {
          DEFAULT: "#5b3fa3",
          light: "#8e6bd0",
        },
      },
      fontFamily: {
        sans: ["var(--font-prompt)", "system-ui", "sans-serif"],
        display: ["var(--font-cinzel)", "serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #f5e27d 0%, #c9a84c 40%, #7d5a00 60%, #c9a84c 80%, #f5e27d 100%)",
        "hero-radial":
          "radial-gradient(ellipse at 30% 30%, rgba(91,63,163,0.35), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(201,168,76,0.18), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(201,168,76,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
