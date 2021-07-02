const { merge } = require('webpack-merge')
const common = require('./common')
const ip = require('ip')
const path = require('path')
const webpack = require('webpack')
const bodyParser = require("body-parser")

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // host: ip.address(),
        port: 3000,
        open: true,
        openPage:'http://localhost:8080',
        hot: true,
        contentBase: path.resolve(__dirname, '../dist'),
        historyApiFallback: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': `'dev'`
        })
    ]
})