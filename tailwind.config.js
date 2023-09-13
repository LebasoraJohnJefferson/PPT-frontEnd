/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'transparent-black': 'rgba(0,0,0,.54)'
      },
      width: {
        'fit': 'fit-content',
        '10px':'10px',
        '11px':'11px',
        '12px':'12px',
        '13px':'13px',
        '14px':'14px',
        '15px':'15px',
        '16px':'16px',
        '16px':'16px',
        '17px':'17px',
        '18px':'18px',
        '19px':'19px',
        '20px':'20px',
        '50px':'50px',
        '100px':'100px',
        '150px':'150px',
        '200px':'200px',
        '5rem':'5rem',
        '10rem':'10rem',
        '15rem':'15rem',
        '20rem':'20rem',
      },
    },
  },
  plugins: [],
}
