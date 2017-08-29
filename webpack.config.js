const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'prod';

const cssDev = [
    {loader: 'style-loader'},
    {loader: 'css-loader'},
    {
        loader: 'postcss-loader',
        options: {
            plugins: () => [
                require('precss'),
                require('autoprefixer')
            ]
        }
    },
    {loader: 'sass-loader'}
];
const cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
        {loader: "css-loader"},
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => [
                    require('precss'),
                    require('autoprefixer')
                ]
            }
        },
        {loader: 'sass-loader'}
    ]
});

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: {
        app: './src/scripts/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: 'babel-loader'
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    },
                    'image-webpack-loader'
                ]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'    // where the fonts will go
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        stats: 'errors-only',
        hot: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'TheAppfield Demo',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'main.css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin({}),
        new webpack.NamedModulesPlugin(),
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        })
    ]
};