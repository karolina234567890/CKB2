/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A56A0',
        'primary-light': '#EFF6FF',
        'page-bg': '#F8F9FA',
      },
    },
  },
  plugins: [],
}

