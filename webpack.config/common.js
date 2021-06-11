const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    performance: {
        maxEntrypointSize: 400000 //设置入口文件最大400kb
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxSize: 244 * 1024,
            maxInitialRequests: 5
        },
    },
    // externals: { // 定义外部依赖，避免把react和react-dom打包进去
    //     "bizcharts": "BizCharts",
    //     // 以下配置为BizCharts依赖的第三方库，需要同时提供
    //     "react": "React",
    //     "react-dom": "ReactDOM",
    // },
    entry: './src/index.js',
    output: {
        filename: '[name][chunkhash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        alias: {
            "@": `${path.resolve(__dirname, '../')}`,
        },
        extensions: ['.js', '.jsx', '.scss', '.css'],
        modules: [
            path.resolve(__dirname, '../node_modules'),
        ],
        fallback: {
            "crypto": false
        }
    },
    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer'),
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8 * 1024,
                        name: 'img/[name][chunkhash:8].[ext]',
                    }
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: "[name].[ext]",
                    outputPath: 'fonts/'
                }
            },
            {
                test: /\.j(s|sx)$/,
                exclude: path.resolve(__dirname, '../node_modules'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            loose: true,
                            "targets": {
                                "chrome": "58",
                                "ie": "11"
                            }
                        }], '@babel/preset-react'],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }], //支持es6的修饰符
                            ["@babel/plugin-proposal-class-properties", { "loose": true }], //支持es6的clsss写法
                            ["@babel/plugin-transform-runtime"],
                            ['import', {
                                "libraryName": "antd",
                                "libraryDirectory": "es",
                                "style": "css" // `style: true` 会加载 less 文件
                            }]
                        ]
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            //打包前删除一次文件
            cleanOnceBeforeBuildPatterns: ['js', 'css', 'img', 'fonts', '*.txt', '*.html', '*.js', '*.css', '*.ico'],
            cleanAfterEveryBuildPatterns: ['*.txt']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../assets/index.html'),
            title: '全国革命文物资源管理平台(试运行)',
            favicon: path.resolve(__dirname, '../assets/images/favicon.ico'),
            minify: {
                removeAttributeQuotes: true,//移除属性的双引号(有的属性有逗号，不能完全删除)
                collapseWhitespace: true //折叠成一行
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id][chunkhash:8].css',//异步加载的样式文件命名
            ignoreOrder: true //禁止顺序检查
        }),
    ]
}