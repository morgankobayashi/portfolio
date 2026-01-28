/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07110B",
        mint: {
  50:  "#F0FDF4",
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
		
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.08)",
      },
	  fontFamily: {
			hand: ["Caveat", "cursive"],
		},
    },
  },
  plugins: [],
};

