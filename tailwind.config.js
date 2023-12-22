/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coolmint: {
          200: "#E5EEEB",
          300: "#C7CECC",
          400: "#7BAA9E",
          500: "#88EFE0",
          // 600: '#1BA894',
          600: "#1DB39E",
          // 600: '#1DC6AE',
          700: "#131818",
          800: "#0B0D0D",
        },
      },
    },
  },
  plugins: [],
};
