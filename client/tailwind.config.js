/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          light: "#131515",
          dark: "#131515",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
