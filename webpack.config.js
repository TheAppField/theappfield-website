const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsplugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');


module.exports = (env, argv) => {
  return {
    name: 'client',
    target: 'web',
    entry: './src/scripts/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsplugin({})
      ]
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
              loader: 'html-loader',
              options: {minimize: true}
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
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
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                minimize: {safe: true}
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('precss'),
                  require('autoprefixer')]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        '@fortawesome/fontawesome-pro-solid': '@fortawesome/fontawesome-pro-solid/shakable.es.js',
        '@fortawesome/fontawesome-pro-regular': '@fortawesome/fontawesome-pro-regular/shakable.es.js',
        '@fortawesome/fontawesome-pro-light': '@fortawesome/fontawesome-pro-light/shakable.es.js'
      }
    },

    plugins: [
      new HtmlWebPackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        minify: {collapseWhitespace: true},
        hash: true
      }),
      new HtmlWebPackPlugin({
        filename: 'impressum.html',
        template: './src/impressum.html',
        minify: {collapseWhitespace: true},
        hash: true
      }),
      new HtmlWebPackPlugin({
        filename: 'chronery.html',
        template: './src/chronery.html',
        minify: {collapseWhitespace: true},
        hash: true
      }),
      new MiniCssExtractPlugin({
        filename: '[name][contenthash].css'
      }),
      new CleanWebpackPlugin(['dist']),
      new webpack.NamedModulesPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        'Util': "exports-loader?Util!bootstrap/js/dist/util"
      })
    ]
  }
};