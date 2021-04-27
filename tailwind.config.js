module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#ee8133',
          500: '#cbd37a',
        },
        primary: {
          100: '#98405f',
          500: '#62293d',
        },
        background: '#ebe6f7',
      },
      borderRadius: {
        DEFAULT: '.5rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled', 'hover'],
    },
  },
  plugins: [],
}
