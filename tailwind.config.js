/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#323238",
        seconday: "#323238",
      },
      fontFamily: {
        poppins: '"Poppins", system-ui',
      },
    },
  },
  plugins: [],
};
