const webpack = require('webpack')
const path = require('path')

module.exports = ['normal', 'minified'].map((type) => {
  let config = {
    entry: './src/clazy-load.js',
    output: {
      filename: type === 'normal' ? 'vue-clazy-load.js' : 'vue-clazy-load.min.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'VueClazyLoad',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: 'babel-loader'
      }]
    },
    plugins: []
  }

  if (type === 'minified') {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    )
  }

  return config
})
