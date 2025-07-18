/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This tells Tailwind to scan all your React files for classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}