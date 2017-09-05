const babelJest = require('babel-jest')
const bemConfig = require('bem-config')()
const appLevels = bemConfig.levelMapSync()

module.exports = babelJest.createTransformer({
  presets: [require.resolve('babel-preset-react-app')],
  plugins: [
    [
      require.resolve('babel-plugin-bem-import'),
      {
        levels: appLevels,
        techs: ['js'],
      },
    ],
  ],
  babelrc: false,
})
