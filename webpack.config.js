const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = ['normal', 'minified'].map((type) => {
  let config = {
    mode: 'none',
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
    optimization: {
      minimize: type === 'minified',
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
          parallel: 4,
          uglifyOptions: {
            warnings: false,
            compress: {
              warnings: false
            },
          },
        })
      ]
    }
  }

  return config
})
