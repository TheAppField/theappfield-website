const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

const isProd = process.env.NODE_ENV === "production";

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
  entry: "./src/scripts/index.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {minimize: true}
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: cssConfig
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      minify: {collapseWhitespace: true},
      hash: true
    }),
    new ExtractTextPlugin({
      filename: "main.css",
      disable: !isProd,
      allChunks: true
    }),
    new CleanWebpackPlugin(["dist"]),
    new webpack.NamedModulesPlugin()

  ]
};