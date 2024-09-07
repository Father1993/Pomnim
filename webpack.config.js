const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlLoader = require('html-loader')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'public'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/assets', to: 'assets' }],
        }),
    ],
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify,
                    options: {
                        encodeOptions: {
                            webp: {
                                quality: 80,
                            },
                        },
                    },
                },
            }),
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
}
