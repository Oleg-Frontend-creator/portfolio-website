const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const pageMap = {
    'index-critical': 'index-page',
    'index-async': 'index-page',
    'portfolio-critical': 'portfolio-details-page',
    'portfolio-async': 'portfolio-details-page',
    'service-critical': 'service-details-page',
    'service-async': 'service-details-page'
};

function jsOut(chunkName) {
    const page = pageMap[chunkName];
    const type = chunkName.endsWith('critical') ? 'critical' : 'async';
    return `js/${page}/${type}.min.js`;
}

function cssOut(chunkName) {
    const page = pageMap[chunkName];
    const type = chunkName.endsWith('critical') ? 'critical' : 'async';
    return `css/${page}/${type}.min.css`;
}

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';

    return {
        entry: {
            'index-critical': './src/entries/index/critical.js',
            'index-async': './src/entries/index/async.js',

            'portfolio-critical': './src/entries/portfolio/critical.js',
            'portfolio-async': './src/entries/portfolio/async.js',

            'service-critical': './src/entries/service/critical.js',
            'service-async': './src/entries/service/async.js'
        },

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: (pathData) => jsOut(pathData.chunk.name),
            assetModuleFilename: 'assets/[name][ext][query]',
            publicPath: './',
            clean: false
        },

        module: {
            rules: [
                {
                    test: /\.(scss|css)$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../../'
                            }
                        },
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg|webp)$/i,
                    type: 'asset/resource',
                    generator: {filename: 'assets/img/[name][ext]'}
                },
                {
                    test: /\.(woff2|woff|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {filename: 'assets/fonts/[name][ext]'}
                },
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),

            new MiniCssExtractPlugin({
                filename: (pathData) => cssOut(pathData.chunk.name)
            }),

            // HTML
            new HtmlWebpackPlugin({
                template: './src/pages/index.html',
                filename: 'index.html',
                chunks: ['index-critical', 'index-async'],
                inject: false,
                templateParameters: (compilation, assets, assetTags, options) => {
                    const pick = (arr, part) => (arr || []).find((x) => x.includes(part));
                    return {
                        ...options,
                        assets,
                        pick
                    };
                }
            }),

            new HtmlWebpackPlugin({
                template: './src/pages/portfolio-details.html',
                filename: 'portfolio-details.html',
                chunks: ['portfolio-critical', 'portfolio-async'],
                inject: false,
                templateParameters: (compilation, assets, assetTags, options) => {
                    const pick = (arr, part) => (arr || []).find((x) => x.includes(part));
                    return {
                        ...options,
                        assets,
                        pick
                    };
                }
            }),

            new HtmlWebpackPlugin({
                template: './src/pages/service-details.html',
                filename: 'service-details.html',
                chunks: ['service-critical', 'service-async'],
                inject: false,
                templateParameters: (compilation, assets, assetTags, options) => {
                    const pick = (arr, part) => (arr || []).find((x) => x.includes(part));
                    return {
                        ...options,
                        assets,
                        pick
                    };
                }
            }),

            // Static folders
            new CopyWebpackPlugin({
                patterns: [
                    {from: './src/forms', to: 'forms'},
                    {from: './src/img', to: 'assets/img'},
                    {from: './src/Oleg_Galuzinsky_Frontend_Portfolio_2026.pdf', to: 'assets/'},
                ]
            })
        ],

        optimization: {
            minimize: isProd,
            minimizer: [
                new TerserPlugin({extractComments: false}),
                new CssMinimizerPlugin()
            ]
        },

        devServer: {
            static: {directory: path.join(__dirname, 'dist')},
            port: 63342,
            open: ['index.html'],
            hot: true
        },

        resolve: {
            extensions: ['.js', '.scss']
        },

        devtool: isProd ? false : 'source-map'
    };
};