const {getBabelLoader} = require('react-app-rewired')
const path = require('path')
const bemConfig = require('bem-config')()
const appLevels = bemConfig.levelMapSync()

function rewireBem(config) {
  const babelLoader = getBabelLoader(config.module.rules)

  delete babelLoader.loader
  delete babelLoader.options

  babelLoader.include = [babelLoader.include].concat(Object.keys(appLevels))
  babelLoader.use = [
    {
      loader: 'webpack-bem-loader',
      options: {
        levels: appLevels,
        techs: ['js', 'css'],
      },
    },
    {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [
          require.resolve('babel-preset-es2015'), // required for webpack-bem-loader
          require.resolve('babel-preset-react-app')
        ],
        cacheDirectory: true,
      },
    },
  ]

  return config
}

module.exports = {
  webpack: function (config) {
    return rewireBem(config)
  },
  jest: function (config) {
    Object.keys(config.transform).forEach((key) => {
      if (config.transform[key].endsWith('babelTransform.js')) {
        config.transform[key] = path.resolve(__dirname + '/jest-babel-transform.js')
      }
    })
    return config
  }
}
