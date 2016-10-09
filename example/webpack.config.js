var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env) {
  return {
    entry: {},
    output: {
      filename: '[name].js'
    },
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'eslint'
        }
      ],
      loaders: [
        {
          test: /\.(png|jpg|jpeg|gif|woff|svg)$/,
          loader: 'url'
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel'
        },
        {
          test: /\.(css|scss)$/,
          loader: ExtractTextPlugin.extract('style',
                    'css?modules,camelCase=dashes,localIdentName=' + (
                      env === 'production' ?
                      '[hash:base64:5]' :
                      '[folder]--[local]--[hash:base64:5]'
                    )
                  )
        }
      ]
    },
    resolve: {
      alias: {
        common: path.join(__dirname, 'src/common')
      }
    },
    eslint: {
      configFile: '.eslintrc'
    },
    plugins: [
      new ExtractTextPlugin('[name].css', {
        disable: env === 'production' ? false : true
      })
    ]
  }
}
