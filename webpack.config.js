const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDEV = process.env.NODE_ENV === 'development'

const config = {
    mode: 'development',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                use: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 102400,
                        name: '[name]-aaa.[ext]'
                    }
                }]
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
    config.module.rules.push({
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
    })
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
} else {
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
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
    })
    config.plugins.push(
        new ExtractPlugin('style.[hash:8].css')
    )
}

module.exports = config;