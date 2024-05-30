/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: {
          DEFAULT: "#FF9900",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        mthin: ["Montserrat-Thin", "sans-serif"],
        mextralight: ["Montserrat-ExtraLight", "sans-serif"],
        mlight: ["Montserrat-Light", "sans-serif"],
        mregular: ["Montserrat-Regular", "sans-serif"],
        mmedium: ["Montserrat-Medium", "sans-serif"],
        msemibold: ["Montserrat-SemiBold", "sans-serif"],
        mbold: ["Montserrat-Bold", "sans-serif"],
        mextrabold: ["Montserrat-ExtraBold", "sans-serif"],
        mblack: ["Montserrat-Black", "sans-serif"],
      },
    },
  },
    plugins: [],
  }