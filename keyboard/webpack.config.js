const path = require("path");
const TenserWebpackPlugin = require('terser-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
    // 파일을 읽어들이기 시작하는 진입점 설정
    entry: './src/js/index.js',

    // 결과물(번들)을 반환하는 설정
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        clean: true
    },
    devtool: "source-map",
    mode: "development",
    devServer: {
        host: "localhost",
        port: 8082,
        open: true,
        watchFiles: 'index.html'
    },
    plugins: [
        new HtmlPlugin({
            title: "keyboard",
            template: "./index.html",
            inject: "body",
            favicon: "./favicon.ico"
        }),
        new MiniCssPlugin({
            filename: "style.css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssPlugin.loader, "css-loader"]
            }
        ]
    },
    optimization: {
        minimizer: [
            new TenserWebpackPlugin(),
            new CssMinimizerPlugin()
        ]
    }
}