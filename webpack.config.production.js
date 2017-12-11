var webpackConfig = require('./webpack.config.base.js');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

webpackConfig.module.loaders = webpackConfig.module.loaders.concat([
    {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
    },
    {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
    }
]);

webpackConfig.plugins = webpackConfig.plugins.concat([
    new ExtractTextPlugin({
        filename: 'style.css',
        allChunks: true
    })
]);

module.exports = webpackConfig;