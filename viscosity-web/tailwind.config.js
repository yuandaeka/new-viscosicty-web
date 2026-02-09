/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'visco-blue': '#4F46E5',
        'visco-orange': '#F97316',
        'visco-indigo': '#3730A3',
      },
      boxShadow: {
        'visco': '0 20px 50px -12px rgba(79, 70, 229, 0.2)',
      }
    },
  },
  plugins: [],
}