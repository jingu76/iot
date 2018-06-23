'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var fs = require('fs');

var SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
module.exports = {
  devtool: 'source-map',
  entry: {
    'main': './public/main.browser.ts',
    'vendor': './public/vendor.browser.ts',
    'polyfills': './public/polyfills.browser.ts'
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.css'],
    modules: [path.resolve(__dirname, 'public'), 'node_modules']
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    path: path.resolve('./dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '../src')
    ),
    /*
         * Plugin: CommonsChunkPlugin
         * Description: Shares common code between the pages.
         * It identifies common modules and put them into a commons chunk.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
         * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
         */
    new CommonsChunkPlugin({
      name: 'polyfills',
      chunks: ['polyfills']
    }),
    // This enables tree shaking of the vendor modules
    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: module => /node_modules/.test(module.resource)
    }),
    // Specify the correct order the scripts will be injected in
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    new CopyWebpackPlugin([
      {
        from: __dirname + '/public/app/assets/map_*.png',
        to:   __dirname + '/dist/img/',
        flatten: true
      },
      {
        from: __dirname + '/public/app/assets/favicon.ico',
        to:   __dirname + '/dist/',
        flatten: true
      },
      {
        from: __dirname + '/misc/w*.js',
        to:   __dirname + '/dist/',
        flatten: true
      },
      {
        from: __dirname + '/misc/s*.js',
        to:   __dirname + '/dist/',
        flatten: true
      }
    ]),
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader'],
        exclude: ['node_modules', 'nessu-xml']
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader?' + JSON.stringify({
          name: '[name]',
          angularBaseWorkaround: true,
          prefixize: true
        }),
        exclude: ['node_modules', 'nessu-xml']
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        exclude: ['node_modules', 'nessu-xml']
      }, {
        test: /\.scss$/,
        loader: ["to-string-loader", "css-loader", "sass-loader"], // creates style nodes from JS strings
        include: [/public/, /hero-tour/] //add this line so we ignore css coming from node_modules
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: ['node_modules', 'nessu-xml']
      }, {
        test: /\.woff(2)?(\?[\s\S])?$/,
        loader: 'url-loader?limit=1000000&mimetype=application/font-woff',
        exclude: ['node_modules', 'nessu-xml']
      }, {
        test: /\.(ttf|eot)(\?[\s\S])?$/,
        loader: 'url-loader?limit=1000000&mimetype=application/font-ttf',
        exclude: ['node_modules', 'nessu-xml']
      }, {
        test: /\.(png|jpg|jpeg|gif|bmp)$/,
        loader: 'url-loader?limit=1000000',
        exclude: ['node_modules', 'nessu-xml']
      }]
  }
};
