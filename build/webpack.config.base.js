const path = require('path')
const creatVueLoaderOptions = require('./vue-loader.config')

const isDEV = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'production', // develpoment || production
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: creatVueLoaderOptions(isDEV)
        }]
      },
      {
        test: /\.jsx$/,
        use: 'babel-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 102400,
            name: 'resources/[path][name]-[hash:8].[ext]'
          }
        }]
      }
    ]
  }
}

module.exports = config
