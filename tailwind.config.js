/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#F5A623",
        danger: "#D0021B",
        ok: "#2ECC71",
        ink: "#0a0a0a",
      },
      fontFamily: {
        display: ['"Black Ops One"', "Impact", "sans-serif"],
        mono: ['"VT323"', '"Share Tech Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
