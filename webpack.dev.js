const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = require("./compile.config");

module.exports = merge(common, {
  devtool: 'source-map', // Active les source-map
  module: {
    // SASS
    rules: [{
      test: /\.s[ac]ss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')(),
                require('css-mqpacker')(), // concat les médias
              ],
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ],
      })
    },
    {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: {
          minimize: false
        }
      }
    }
  ]},
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development, 
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: [config.distPath]
      }
    }),
    new CleanWebpackPlugin([config.distPath])
  ],
});