/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orangep: "#D56C06",
        greenp: "#97BF0D",
        beigep: "#ECE8DA",
      },
    },
  },
  plugins: [],
};
