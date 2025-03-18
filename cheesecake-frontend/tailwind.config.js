module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // Add all your React component paths
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pinkOverlay: "rgba(255, 0, 153, 0.1)",
        blueOverlay: "rgba(0, 115, 255, 0.1)",
        main: "#001C4C",
        main_dark: "#011840",

      },
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      margin: {
        '-150': '-150px',
        '150': '150px',
      },
    },
  },
  plugins: [],
};
