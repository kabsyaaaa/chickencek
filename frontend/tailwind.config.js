/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        orange: { DEFAULT: "#F2762E", dark: "#D9631E", tint: "#FFF1E7" },
        brown: { DEFAULT: "#3A2E29", soft: "#6B5D57" },
        appgreen: { DEFAULT: "#1FAE59", tint: "#EAFBF1" },
        appbg: "#F7F4F1",
        line: "#EFE7E0",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};
