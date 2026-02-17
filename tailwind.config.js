/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07110B",
        mint: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },

        // RLG / Reconomy palette (from brand guidelines)
        rlg: {
          navy: "#005596",
          sky: "#4bc3e1",
          indigo: "#4b2378",
          mauve: "#9678e6",
          cherry: "#781e50",
          rose: "#e650a5",
          red: "#eb3246",
          orange: "#f09600",
          cloud: "#d5dfe3",
          ocean: "#006e87",
          teal: "#05beaa",
          stone: "#dadac8",
          forest: "#007864",
          lime: "#99d500",
          yellow: "#e1e600",
          leaf: "#00cd50",
          mint: "#3ce664",
          ink: "#004664",
          body: "#3c3c3c",
          cobalt: "#376ee1",
          white: "#ffffff",
        },
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.08)",
      },
      fontFamily: {
        hand: ["Caveat", "cursive"],
        rlg: ["Montserrat", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
