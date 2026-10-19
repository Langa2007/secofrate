// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sic-dark': '#ffffff',
        'sic-black': '#000000',
        'sic-charcoal': '#ffffff',
        'sic-red': '#4b2e24',
        'sic-red-glow': '#765244',
        'sic-gold': '#806044',
        'sic-silver': '#6b625c',
        'sic-gray': '#e6dfda',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space': ['Space Grotesk', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 8s linear infinite',
        'shimmer': 'shimmer 3s infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) rotate(45deg)' },
        },
      },
    },
  },
  plugins: [],
}