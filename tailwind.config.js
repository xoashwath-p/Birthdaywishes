/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFE5EC',
          blush: '#FFC2D1',
          rose: '#FFB3C6',
          deep: '#FB6F92',
          cream: '#FFF9F5',
          lavender: '#F3E8FF',
          peach: '#FFE8D6',
          gold: '#FEF3C7',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Dancing Script"', '"Caveat"', 'cursive'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'polaroid': '0 10px 25px -5px rgba(251, 111, 146, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'polaroid-hover': '0 20px 35px -5px rgba(251, 111, 146, 0.35), 0 10px 15px -5px rgba(0, 0, 0, 0.08)',
        'soft-glow': '0 0 25px rgba(251, 111, 146, 0.35)',
        'candle-glow': '0 0 20px 5px rgba(254, 240, 138, 0.8), 0 0 35px 10px rgba(251, 146, 60, 0.5)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
