/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pages/**/*.{js,jsx}', './src/**/*.{js,jsx}'],
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
        inter: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
}
