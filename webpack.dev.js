const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map', // Быстрее для разработки
    entry: {
        main: './src/js/index.js',
        gallery: './src/js/gallery.js',
        policy: './src/js/policy.js',
        form: './src/js/form.js',
        swiper: ['./node_modules/swiper/swiper-bundle.min.js'],
    },
    output: {
        filename: 'js/[name].[contenthash].js',
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
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            sources: {
                                list: [
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src',
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/gallery.html',
            filename: 'gallery.html',
            chunks: ['gallery'],
        }),
        new HtmlWebpackPlugin({
            template: './src/policy.html',
            filename: 'policy.html',
            chunks: ['policy'],
        }),
        new HtmlWebpackPlugin({
            template: './src/legal.html',
            filename: 'legal.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/terms.html',
            filename: 'terms.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/consent.html',
            filename: 'consent.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/metrics-consent.html',
            filename: 'metrics-consent.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/recommendations.html',
            filename: 'recommendations.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/requisites.html',
            filename: 'requisites.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/juridical-info.html',
            filename: 'juridical-info.html',
            chunks: ['main'],
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/styles/[name].[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'src/js', to: 'js' }, // Добавьте эту строку
                { from: 'src/site.webmanifest', to: 'site.webmanifest' }, // И эту, если файл существует
            ],
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
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
        hot: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' },
                { from: /^\/gallery/, to: '/gallery.html' },
                { from: /^\/policy/, to: '/policy.html' },
                { from: /^\/legal/, to: '/legal.html' },
                { from: /^\/terms/, to: '/terms.html' },
                { from: /^\/consent/, to: '/consent.html' },
                { from: /^\/metrics-consent/, to: '/metrics-consent.html' },
                { from: /^\/recommendations/, to: '/recommendations.html' },
                { from: /^\/requisites/, to: '/requisites.html' },
                { from: /^\/juridical-info/, to: '/juridical-info.html' },
            ],
        },
    },
}
