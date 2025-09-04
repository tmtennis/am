/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        'extrabold': '800',
      },
      letterSpacing: {
        widest: '.25em',
      },
      aspectRatio: {
        '16/10': '16 / 10',
        '3/2': '3 / 2',
        '4/3': '4 / 3',
      },
      colors: {
        background: '#1a1919',
      },
      brightness: {
        '75': '.75',
        '65': '.65',
        '30': '.3',
      },
      opacity: {
        '80': '0.8',
        '75': '0.75',
        '40': '0.4',
      },
    },
  },
  plugins: [],
}
