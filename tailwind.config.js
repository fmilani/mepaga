module.exports = {
  mode: 'jit',
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    safelist: [
      'bg-pink-700',
      'bg-yellow-700',
      'bg-purple-700',
      'nm-flat-pink-700',
      'nm-flat-yellow-700',
      'nm-flat-purple-700',
      'nm-inset-pink-700',
      'nm-inset-yellow-700',
      'nm-inset-purple-700',
      'active:nm-inset-pink-700',
      'active:nm-inset-yellow-700',
      'active:nm-inset-purple-700',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-neumorphism')
  ],
}
