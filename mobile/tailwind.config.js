import gluestackPlugin from "@gluestack-ui/nativewind-utils/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{html,js,jsx,ts,tsx}",
    "./src/components/**/*.{html,js,jsx,ts,tsx,mdx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "pink-1000": "#F2C7F8",
        "pink-1100": "#D107FB",
        "pink-1200": "#ED93FF",
        "black-1000": "#1F1F1F",
        "black-1100": "#333333",
        "black-1200": "#2B2B2B",
        "gray-1000": "#999999",
        "gray-1100": "#D9D9D9",
        "gray-1200": "#B9B9B9",
        "gray-1300": "#3B3B3B",
        "gray-1400": "#E9E9E9",
        "gray-1500": "#474747",
        "gray-1600": "#353535",
        "black-1300": "#2A2A2A",
        "black-1400": "#343434",
        "black-1500": "#191919",
        "red-1000": "#D3392A",
        "pink-1300": "#FF0099",
        "green-1000": "#308D44",
      },

      screens: {
        xs: "320px",
        sm: "575px",
        md: "767px",
        lg: "991px",
        xl: "1199px",
        "2xl": "1365px",
        "3xl": "1600px",
        "4xl": "1728px",
      },

      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },

      boxShadow: {
        "soft-4": "0px 0px 40px rgba(38, 38, 38, 0.1)",
        "3xl": "0px -4px 4px 0px rgba(0, 0, 0, 0.15)",
        "4xl": "0px 4px 10px 0px rgba(2, 98, 102, 0.20)",
      },
    },
  },
  plugins: [gluestackPlugin],
};
