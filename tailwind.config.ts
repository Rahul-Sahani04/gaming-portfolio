import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";


const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
    "./content/**/*.mdx",
  ],

  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },

      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },

      colors: {
        // required base
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // optional but commonly used
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },

      backgroundImage: {
        "gradient-radial":
          "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      animation: {
        "fade-in": "fade-in 3s ease-in-out forwards",
        title: "title 3s ease-out forwards",
        "fade-left": "fade-left 3s ease-in-out forwards",
        "fade-right": "fade-right 3s ease-in-out forwards",
        "fade-in-fast": "fade-in 1s ease-in-out forwards",
        "animate-meteor": "meteor 5s linear infinite",
      },

      keyframes: {
        "fade-in": {
          "0%": { opacity: "0%" },
          "75%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
        "fade-left": {
          "0%": { transform: "translateX(100%)", opacity: "0%" },
          "30%": { transform: "translateX(0%)", opacity: "100%" },
          "100%": { opacity: "0%" },
        },
        "fade-right": {
          "0%": { transform: "translateX(-100%)", opacity: "0%" },
          "30%": { transform: "translateX(0%)", opacity: "100%" },
          "100%": { opacity: "0%" },
        },
        title: {
          "0%": {
            lineHeight: "0%",
            letterSpacing: "0.25em",
            opacity: "0",
          },
          "80%": { opacity: "100%" },
          "100%": {
            lineHeight: "100%",
            opacity: "100%",
          },
        },
        meteor: {
          "0%": {
            transform: "rotate(var(--angle)) translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "rotate(var(--angle)) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
  },

  plugins: [
    typography,
  ],
};

export default config;