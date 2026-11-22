/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: { 50: '#fcf7e8', 100: '#f6e9c3', 200: '#ecd48f', 300: '#dfba5e', 400: '#cfa03d', 500: '#b8892b', 600: '#9a6f21', 700: '#7a561b', 800: '#5d4217' },
        clay: { 50: '#fcf1ed', 100: '#f8dcd2', 500: '#b5533a', 600: '#9c4430', 700: '#7f3626' },
        ink: { 700: '#3a2e25', 800: '#2a211a', 900: '#1b1511', 950: '#120d0a' },
        cream: '#fbf6ee',
        sand: '#f3eadb',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 12px 34px -14px rgba(60, 40, 15, .28)',
        gold: '0 12px 36px -10px rgba(184, 137, 43, .55)',
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pop: { '0%': { transform: 'scale(.85)', opacity: 0 }, '100%': { transform: 'scale(1)', opacity: 1 } },
        slideUp: { from: { transform: 'translateY(24px)', opacity: 0 }, to: { transform: 'translateY(0)', opacity: 1 } },
        glow: { '0%,100%': { opacity: .55 }, '50%': { opacity: .95 } },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        spinSlow: 'spinSlow 22s linear infinite',
        marquee: 'marquee 30s linear infinite',
        pop: 'pop .25s ease-out',
        slideUp: 'slideUp .7s ease-out both',
        glow: 'glow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
