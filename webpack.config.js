const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDEV = process.env.NODE_ENV === 'development'

const config = {
    mode: 'development',
    entry: path.join(__dirname,'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 102400,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ] 
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
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
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDEV ? '"development"' : '"production"'
            }
        })
    ]
}

if (isDEV) {
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0', //win10直接访问0.0.0.0是不行的，要访问本机ip
        overlay: {
            error: true
        },
        hot: true
    },
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config;