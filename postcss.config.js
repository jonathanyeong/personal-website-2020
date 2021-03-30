const cssnano = require('cssnano')({
    preset: 'default',
})

module.exports = {
  plugins: [
    require('@tailwindcss/jit'),
    require('autoprefixer'),
    ...process.env.NODE_ENV === 'production'
      ? [cssnano]
      : []
  ]
}