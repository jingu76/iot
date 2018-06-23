'use strict';

const webpack = require('webpack');
var path = require('path');

let externals = _externals();

module.exports = {
    entry: {
        app: './bin/www',
    },
    target: 'node',
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js'],
        modules: [path.resolve(__dirname, 'routes'), 'node_modules']
    },
    externals: externals,
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    // presets: ['es2015','stage-0']
                    presets: ['es2015','stage-0']
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            minChunks: function (module, count) {
            // any required modules inside node_modules are extracted to vendor
            return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                path.join(__dirname, '../node_modules')
                ) === 0
            )
            }
        })
    ]
};

function _externals() {
    let manifest = require('./package.json');
    let dependencies = manifest.dependencies;
    let externals = {};
    for (let p in dependencies) {
        externals[p] = 'commonjs ' + p;
    }
    return externals;
}