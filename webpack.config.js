const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'production',
    context: __dirname,

    entry: {
        // слева то, как будет в dist, справа - как в src лежит
        'js/index/critical': path.join(SRC, 'js/entries/index/critical.js'),
        'js/index/async': path.join(SRC, 'js/entries/index/async.js'),
        'js/project/critical': path.join(SRC, 'js/entries/project/critical.js'),
        'js/service/critical': path.join(SRC, 'js/entries/service/critical.js'),
        'js/service/async': path.join(SRC, 'js/entries/service/async.js'),

        'css/index/async': path.join(SRC, 'css/page-styles/index.css'),
        'css/index/critical': path.join(SRC, 'css/page-styles/index-hero.css'),
        'css/project/critical': path.join(SRC, 'css/page-styles/project.css'),
        'css/service/async': path.join(SRC, 'css/page-styles/service.css'),
        'css/service/critical': path.join(SRC, 'css/page-styles/service-hero.css'),
    },

    output: {
        path: DIST,
        filename: '[name].min.js',
        clean: true,
        publicPath: '',
    },

    module: {
        rules: [
            {
                test: /\.(css)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {publicPath: '../../'}
                    },
                    {
                        loader: 'css-loader',
                        options: {url: true}
                    }
                ],
            },

            {
                test: /\.(png|jpe?g|gif|webp|svg)$/i,
                type: 'asset/resource',
                generator: {filename: 'assets/img/[name][ext][query]'},
            },

            {
                test: /\.(woff2)$/i,
                type: 'asset/resource',
                generator: {filename: 'assets/fonts/[name][ext][query]'},
            },

            {
                test: /\.(pdf)$/i,
                type: 'asset/resource',
                generator: {filename: 'assets/[name][ext][query]'},
            }
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({extractComments: false}),
            new CssMinimizerPlugin(),
        ],
    },

    plugins: [
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.join(SRC, 'img'), to: 'assets/img', noErrorOnMissing: true},
                {from: path.join(SRC, 'php'), to: 'php', noErrorOnMissing: true},
            ],
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(SRC, 'pages/index.html'),
            inject: false,
            chunks: [
                'page-styles/index',
                'page-styles/index-hero',
                'index/critical',
                'index/async',
            ],
        }),

        new HtmlWebpackPlugin({
            filename: 'project-details.html',
            template: path.join(SRC, 'pages/project-details.html'),
            inject: false,
            chunks: [
                'page-styles/project',
                'project/critical',
            ],
        }),

        new HtmlWebpackPlugin({
            filename: 'service-details.html',
            template: path.join(SRC, 'pages/service-details.html'),
            inject: false,
            chunks: [
                'page-styles/service',
                'page-styles/service-hero',
                'service/critical',
                'service/async',
            ],
        }),
    ],

    resolve: {
        extensions: ['.js', '.css'],
    },

    stats: 'errors-warnings',
};