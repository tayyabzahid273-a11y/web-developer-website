
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff5f6",
          100: "#fde8ea",
          200: "#fad1d6",
          300: "#f5b5bd",
          400: "#ee919e",
          500: "#e46f82",
        },
        cream: {
          50: "#fffdf8",
          100: "#fdf8ee",
          200: "#f8efdc",
          300: "#f0e3c6",
        },
        sage: {
          50: "#f4f7f2",
          100: "#e6ede1",
          200: "#cddbc4",
          300: "#acc29f",
          400: "#89a67a",
          500: "#6b8a5c",
          600: "#546d48",
        },
        terracotta: {
          300: "#e0a58c",
          400: "#d58a6b",
          500: "#c96f4a",
          600: "#b05a3a",
          700: "#8f4730",
        },
        ink: "#3d3330",
      },
      fontFamily: {
        heading: ['"Fraunces"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(176, 90, 58, 0.25)",
        card: "0 4px 20px -4px rgba(61, 51, 48, 0.08)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};