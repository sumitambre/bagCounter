/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Titan Eye+ brand palette (adjust hex to exact brand values if needed)
        titan: {
          50: '#e8f7ef',
          100: '#c6ebd6',
          400: '#22c55e',
          500: '#00a651', // Titan signature green
          600: '#00913f',
          700: '#00762f',
        },
        navy: {
          800: '#0f2544',
          900: '#0b1c34',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        drawBox: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        drawBox: 'drawBox 0.6s ease-out 0.4s both',
        slideUp: 'slideUp 0.4s ease-out both',
        toastIn: 'toastIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
