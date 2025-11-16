/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          DEFAULT: '#1f3c88',
          foreground: '#ffffff',
          50: '#f2f6ff',
          100: '#d9e4ff',
          200: '#b3c9ff',
          300: '#8caeff',
          400: '#668fff',
          500: '#4b74e6',
          600: '#3459b4',
          700: '#243f82',
          800: '#182a59',
          900: '#0b1530',
        },
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(31, 60, 136, 0.25)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'slide-up-fade': {
          from: { opacity: 0, transform: 'translateY(4px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s ease-out',
        'accordion-up': 'accordion-up 0.3s ease-out',
        'fade-in': 'fade-in 0.35s ease-out',
        'slide-up-fade': 'slide-up-fade 0.25s ease-out',
      },
    },
  },
  plugins: [],
};






