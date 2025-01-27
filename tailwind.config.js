/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        bgColorTransition: {
          "0%": { backgroundColor: "#3b82f6" },
          "33%": { backgroundColor: "#8b5cf6" },
          "66%": { backgroundColor: "#f87171" },
          "100%": { backgroundColor: "#3b82f6" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(-10%)" },
          "50%": { transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        bgColorTransition: "bgColorTransition 3s linear infinite",
        spinSlow: "spinSlow 2s linear infinite",
        bounce: "bounce 1s ease-in-out infinite",
        fadeIn: "fadeIn 1s ease-in-out forwards",
        fadeInUp: "fadeInUp 0.5s ease-out forwards",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
};
