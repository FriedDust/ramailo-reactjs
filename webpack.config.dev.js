var webpackConfig = require('./webpack.config.base.js');

webpackConfig.module.loaders = webpackConfig.module.loaders.concat([
    {
        test: /\.scss$/,
        loaders: [{
            loader: "style-loader"
        }, {
            loader: "css-loader", options: {
                sourceMap: true
            }
        }, {
            loader: "sass-loader", options: {
                sourceMap: true
            }
        }]
    },
    {
        test: /\.css$/,
        loaders: [{
            loader: "style-loader"
        }, {
            loader: "css-loader", options: {
                sourceMap: true
            }
        }]
    }
]);

module.exports = webpackConfig;