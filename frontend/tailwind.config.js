/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#D56C06",
        green: "#97BF0B",
        beige: "#ECE8DA",
      },
    },
  },
  plugins: [],
};
