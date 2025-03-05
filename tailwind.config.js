/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // 关闭preflight以避免影响Naive UI
  },
  theme: {
    extend: {},
  },
  plugins: [],
} 