module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.{html,ts}"],
  },
  theme: {
    extend: {
      colors: {
        'light-gray': '#EAEEFA',
        'soft-violet': '#5959B4'
      },
      width: {
        'fit-content': 'fit-content'
      }
    },
  },
  variants: {},
  plugins: [],
}
