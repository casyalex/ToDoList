const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const baseConfig = require('./webpack.config.base')

const defalutPlugins = [
  new VueLoaderPlugin(),
  new HtmlPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  })]

const devServer = {
  port: 8080,
  host: '0.0.0.0', // win10直接访问0.0.0.0是不行的，要访问本机ip
  overlay: {
    error: true
  },
  hot: true
}

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.styl/,
      oneOf: [
        {
          resourceQuery: /module/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path]-[name]-[hash:base64:5]',
                camelCase: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        },
        {
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    }]
  },
  devServer,
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defalutPlugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
})

module.exports = config
