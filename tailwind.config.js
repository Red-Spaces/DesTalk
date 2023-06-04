/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple_darker: "#180427",
        purple_dark: "#3a1f5c",
        purple_light: "#cea2fd",
        purple_lighter: "#fff0f5",
      },
    },
  },
  plugins: [],
};
