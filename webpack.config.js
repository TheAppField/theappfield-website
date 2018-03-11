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
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'webfonts/'    // where the fonts will go
          }
        }]
      },
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
        test: /\.(scss)$/,
        use: cssConfig
      }
    ]
  },
  resolve: {
    alias: {
      '@fortawesome/fontawesome-pro-solid$': '@fortawesome/fontawesome-pro-solid/shakable.es.js',
      '@fortawesome/fontawesome-pro-regular$': '@fortawesome/fontawesome-pro-regular/shakable.es.js',
      '@fortawesome/fontawesome-pro-light': '@fortawesome/fontawesome-pro-light/shakable.es.js'
    }
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
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
  ]
};