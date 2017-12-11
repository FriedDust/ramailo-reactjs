var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var path = require("path");
var APP_PATH = path.resolve(__dirname, 'app');
var BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: [
            APP_PATH + "/app.js"
        ]
    },
    output: {
        path: BUILD_PATH,
        filename: "app.js",
        publicPath: '/'
    },
    devServer: {
        contentBase: './build',
        inline: true,
        hot: true,
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
            },
            {
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : 'file-loader',
                query: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader : 'file-loader',
                query: {
                    name: 'images/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlwebpackPlugin({
            title: 'Ramailo UI',
            filename: 'index.html',
            template: 'index.ejs'
        }),
        new webpack.ProvidePlugin({
            React: "react",
            ReactDOM: "react-dom",
            $: "jquery",
            jQuery: "jquery"
        }),
    ]
};
