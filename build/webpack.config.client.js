const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const isDEV = process.env.NODE_ENV === 'development'

const defalutPlugins = [
  new VueLoaderPlugin(),
  new HtmlPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDEV ? '"development"' : '"production"'
    }
  })]

const devServer = {
  port: 8000,
  host: '0.0.0.0', // win10直接访问0.0.0.0是不行的，要访问本机ip
  overlay: {
    error: true
  },
  hot: true
}

let config

if (isDEV) {
  config = merge(baseConfig, {
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
    plugins: defalutPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    mode: 'production',
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          oneOf: [
            {
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
            {use: ExtractPlugin.extract({
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
            })}
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        name: 'vendor'
      },
      runtimeChunk: {
        name: 'runtime'
      }
    },
    plugins: defalutPlugins.concat([new ExtractPlugin('style.[hash:8].css')])
  })
}

module.exports = config
