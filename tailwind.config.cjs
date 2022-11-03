/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/*.vue",
    "src/components/*.vue"
  ],
  theme: {
    extend: {
      'fontFamily': {
        'poppins': 'Poppins'
      }
    },
  },
  plugins: [],
}
