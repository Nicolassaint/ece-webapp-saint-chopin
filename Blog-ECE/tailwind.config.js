/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat"],
      },
      colors: {
        blueJeece: "#36455A",
        greenJeece: "#5FAB65",
    },
  },
  },
  plugins: [
    require ('@tailwindcss/typography'),
    require ('tailwindcss-font-inter'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
