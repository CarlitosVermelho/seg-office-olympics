/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          300: '#FCD34D',
          DEFAULT: '#D4A017',
          500: '#D4A017',
          600: '#B8860B',
          700: '#92690A',
        },
        silver: {
          DEFAULT: '#C0C0C0',
          light: '#E8E8E8',
          dark:  '#808080',
        },
        bronze: {
          DEFAULT: '#CD7F32',
          light: '#DEB887',
          dark:  '#8B4513',
        },
        navy: {
          DEFAULT: '#0D1B35',
          50:  '#E8EBF5',
          100: '#C5CEEB',
          500: '#1D2B4F',
          700: '#0D1B35',
          900: '#080D1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
