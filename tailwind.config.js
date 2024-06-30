/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // light mode
        light_primary: "#FFFFFF",
        light_primary_content: "#000000",
        light_secoundary: "#06b6d4",
        light_accent: "#3b82f6",
        light_accent_content: "#3c2f2f",
        light_neutral: "#212121",

        // glogal
        warning: "#f4b400",
        success: "#31ab70",
        error: "#ef4444",

        // dark mode
        dark_primary: "#212121",
        dark_primary_content: "#FFFFFF",
        dark_secoundary: "#05537F",
        dark_accent: "#3b82f6",
        dark_accent_content: "#BBBBBB",
        dark_neutral: "#F0F1F1",
      },
    },
  },
  plugins: [],
};
