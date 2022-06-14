/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {}
  },
  plugins: [],
  purge: [
    './src/components/**/*.vue',
    './src/styles/**/*.scss',
    './src/components/**/*.vue',
    './src/views/**/*.vue'
  ]
}
