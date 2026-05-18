/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#0f172a',
        'wisdom-orange': '#FF6B00',
      }
    },
  },
  plugins: [],
}
