module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.ts'],
  },
  theme: {
    extend: {
      colors: {
        'light-gray': '#EAEEFA',
        'soft-violet': '#5959B4'
      }

    },
  },
  variants: {},
  plugins: [],
}
