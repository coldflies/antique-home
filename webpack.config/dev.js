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
        host: ip.address(),
        port: 3000,
        open: true,
        hot: true,
        contentBase: path.resolve(__dirname, '../dist'),
        historyApiFallback: true,
        before: app => {
            app.use(bodyParser.json());
            app.post('/api/test', (req, res) => {
                setTimeout(() => {
                    res.json({
                        code: 0,
                        data: [],
                        message: '请求成功'
                    })
                }, 2000);
            })
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': `'dev'`
        })
    ]
})