/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bkg: "hsl(var(--color-bkg) / 1.0)",
        prim: "hsl(var(--color-prim) / 1.0)",
        side: "hsl(var(--color-side) / 1.0)",
        "root-white": "hsl(var(--color-root-white) / 1.0)",
        "light-gr": "hsl(var(--color-light-gr) / 1.0)",
        "root-green": "hsl(var(--color-root-green) / 1.0)",
        "root-input": "hsl(var(--color-root-input) / 1.0)",
        gr: "hsl(var(--color-gr) / 1.0)",
        "bg-white": "hsl(var(--color-bg-white) / 1.0)",
        "root-blue": "hsl(var(--color-root-blue) / 1.0)",
        "root-red": "hsl(var(--color-root-red) / 1.0)",
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
