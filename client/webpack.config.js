const path = require('path');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    devtool: 'source-map',

    target: ['web', 'es5'],

    entry: './js/phoneBook.js',

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../public/dist'),
        publicPath: "/Users/jean.ponomarev/IdeaProjects/phone-book-express-vue-mongodb"
    },

    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },

    module: {
        rules: [{
            test: /\.vue$/,
            use: "vue-loader"
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        },{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
            ]
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, "css-loader",
            ]
        }, {
            test: /\.(png|bmp|jpg|jpeg|gif|svg|ttf|eot|woff|woff2)$/i,
            loader: "file-loader",
            options: {
                name: '[path][name].[ext]?[contenthash]'
            }
        }]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new VueLoaderPlugin()
    ]
};