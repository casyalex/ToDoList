const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const baseConfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config

config = merge(baseConfig, {
  target: 'node', // ssr跑在node环境
  entry: path.join(__dirname, '../client/sever-entry.js'),
  devtool: '#source-map',
  output: {
    libraryTarget: 'commonjs2', // 指定引用出去形式，module exports
    filename: 'sever-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [{
      test: /\.styl/,
      oneOf: [{
        resourceQuery: /module/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:5]',
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
        })
      },
      {
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
      ]
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ExtractPlugin('style.[hash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'develoment'),
      'process.env.VUE_ENV': 'server'
    }),
    new VueServerPlugin()
  ]
})

module.exports = config
