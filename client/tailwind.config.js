/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#00E5FF",
        secondary: "#8B5CF6",
        accent: "#00FFB3",
        dark: "#050816",
        card: "#111827",
      },
    },
  },
  plugins: [],
}