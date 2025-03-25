/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'loading': 'loading 2s linear infinite',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        primary: {
          50: '#14ecff',
          100: '#16cbdb',
          200: '#13afbd',
          300: "#0E94A0",
          400: '#0e818c',
          500: "#0b717a",
          600: '#0b6770',
          700: '#095057',
          800: '#06383d',
          900: '#042326',
        },
      },
      keyframes: {
        loading: {
          '0%': { backgroundSize: "100% 0, 0 100%" },
          '30%': {},
          '50%': { backgroundSize: "100% 0, 100% 100%" },
          '80%': {},
          '100%': { backgroundSize: "100% 100%, 100% 100%" },
        },
      },
    },
  },
  plugins: [],
}

