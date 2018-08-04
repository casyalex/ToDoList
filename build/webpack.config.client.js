const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const ExtractPlugin = require('extract-text-webpack-plugin')
const ExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDEV = process.env.NODE_ENV === 'development'

const defalutPlugins = [
  new VueLoaderPlugin(),
  new HtmlPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDEV ? '"development"' : '"production"'
    }
  }),
  new VueClientPlugin()
]

const devServer = {
  port: 8000,
  host: '0.0.0.0', // win10直接访问0.0.0.0是不行的，要访问本机ip
  overlay: {
    error: true
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: {
    index: '/public/index.html'
  },
  proxy: {
    '/api': 'http://127.0.0.1:3333/',
    '/user': 'http://127.0.0.1:3333/'
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
      new webpack.HotModuleReplacementPlugin()
    ]),
    resolve: {
      alias: {
        'model': path.join(__dirname, '../client/model/client-model.js')
      }
    }
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js')
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                ExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[name]--[local]--[hash:base64:5]',
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
                ExtractPlugin.loader,
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
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defalutPlugins.concat([new ExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash:5].css',
      chunkFilename: '[name].[hash:5].css'
    })
    ])
    // plugins: defalutPlugins
  })
}

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/client-model.js')
  }
}

module.exports = config
