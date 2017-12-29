var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var path = require("path");
var APP_PATH = path.resolve(__dirname, 'app');
var BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: [
            APP_PATH + "/index.tsx"
        ]
    },
    output: {
        path: BUILD_PATH,
        filename: "app.js",
        publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
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
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
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
        })
    ]
};
