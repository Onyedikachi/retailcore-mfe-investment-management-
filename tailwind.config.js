/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "pearless-purple": "linear-gradient(90deg, #783B96 0%, #C5593C 100%)",
      },
      colors: {
        "sterling-red": {
          800: "#CF2A2A",
        },
        success: {
          500: "#2FB755",
        },
        danger: {
          500: "#CF2A2A",
        },
      },
      width: {
        calc: "calc(100% - 294px)",
      },
    },
  },
  plugins: [],
};
