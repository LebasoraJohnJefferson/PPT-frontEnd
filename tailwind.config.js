module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'transparent-black':'rgba(0,0,0,.54)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
