const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const path = require("path")

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: ["./src/app/main.ts"]
    },

    output: {
        path: resolve('dist'),
        publicPath: "/",
        filename: "app.js"
    },

    resolve: {
        extensions: ['.js', '.ts', '.html'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [
            {
                enforce: 'post',
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                enforce: 'post',
                test: /\.scss$/,
                use: ['style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    //require('precss'),
                                    //require('autoprefixer')
                                ];
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'vue-template-loader',
                exclude: resolve('src/index.html'),
                options: {
                    scoped: true
                }
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: resolve('tsconfig.json')
                }
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                include: [resolve('src'), resolve('tests')],
                options: {
                    formatter: 'grouped',
                    formattersDirectory: 'node_modules/custom-tslint-formatters/formatters'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('src/index.html'),
            inject: 'body'
        }),
        new CompressionPlugin()
    ]
}