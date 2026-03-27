import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        cyber: {
          cyan: "#00f0ff",
          pink: "#ff003c",
          yellow: "#fcee0a",
          dark: "#0a0a0c",
          gray: "#1a1a1c",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
    animation: {
      "fade-in": "fade-in 3s ease-in-out forwards",
      title: "title 3s ease-out forwards",
      "fade-left": "fade-left 3s ease-in-out forwards",
      "fade-right": "fade-right 3s ease-in-out forwards",
      "fade-in-slow": "fade-in 3s ease-in-out forwards",
      "fade-in-fast": "fade-in 1s ease-in-out forwards",
      "animate-meteor": "meteor 5s linear infinite",
    },
    keyframes: {
      "fade-in": {
        "0%": {
          opacity: "0%",
        },
        "75%": {
          opacity: "0%",
        },
        "100%": {
          opacity: "100%",
        },
      },
      "fade-left": {
        "0%": {
          transform: "translateX(100%)",
          opacity: "0%",
        },

        "30%": {
          transform: "translateX(0%)",
          opacity: "100%",
        },
        "100%": {
          opacity: "0%",
        },
      },
      "fade-right": {
        "0%": {
          transform: "translateX(-100%)",
          opacity: "0%",
        },

        "30%": {
          transform: "translateX(0%)",
          opacity: "100%",
        },
        "100%": {
          opacity: "0%",
        },
      },
      title: {
        "0%": {
          "line-height": "0%",
          "letter-spacing": "0.25em",
          opacity: "0",
        },
        "25%": {
          "line-height": "0%",
          opacity: "0%",
        },
        "80%": {
          opacity: "100%",
        },

        "100%": {
          "line-height": "100%",
          opacity: "100%",
        },
      },
      meteor: {
        "0%": {
          transform: "rotate(var(--angle)) translateX(0)",
          opacity: "1",
        },
        "70%": {
          opacity: "1",
        },
        "100%": {
          transform: "rotate(var(--angle)) translateX(-500px)",
          opacity: "0",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-debug-screens"),
  ],
};
export default config;
