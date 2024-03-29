/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: "0.750rem",
      base: "1rem",
      xl: "1.333rem",
      "2xl": "1.777rem",
      "3xl": "2.369rem",
      "4xl": "3.158rem",
      "5xl": "4.210rem",
    },
    extend: {
      transitionProperty: {
        height: "height",
      },
      fontFamily: {
        heading: "Poppins",
        body: "Poppins",
      },
      colors: {
        text: {
          50: "#ecf5f8",
          100: "#daeaf1",
          200: "#b5d5e3",
          300: "#8fc1d6",
          400: "#6aacc8",
          500: "#4597ba",
          600: "#377995",
          700: "#295b70",
          800: "#1c3c4a",
          900: "#0e1e25",
          950: "#070f13",
        },
        background: "#f3f9fb",
        primary: {
          50: "#ebf5f9",
          100: "#d7ebf4",
          200: "#afd7e9",
          300: "#88c4dd",
          400: "#60b0d2",
          500: "#389cc7",
          600: "#2d7d9f",
          700: "#225e77",
          800: "#163e50",
          900: "#0b1f28",
          950: "#061014",
        },
        secondary: {
          50: "#eaf5fa",
          100: "#d6ecf5",
          200: "#acd9ec",
          300: "#83c5e2",
          400: "#5ab2d8",
          500: "#309fcf",
          600: "#277fa5",
          700: "#1d5f7c",
          800: "#134053",
          900: "#0a2029",
          950: "#051015",
        },
        accent: {
          50: "#eaf6fb",
          100: "#d4ecf7",
          200: "#a9daef",
          300: "#7ec7e7",
          400: "#54b5de",
          500: "#29a2d6",
          600: "#2182ab",
          700: "#186181",
          800: "#104156",
          900: "#08202b",
          950: "#041015",
        },
      },
    },
  },
  plugins: [],
};
