/**
 * @name SEkin
 * @description 
 * @time 2020-07-10
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理指定文件夹
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 打包时分离css
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制静态文件
const ProgressBarPlugin = require('progress-bar-webpack-plugin');// 查看打包进度
const { VueLoaderPlugin } = require('vue-loader')

module.exports = function (isDev) {

    return [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
          filename: 'css/[name].css', 
          chunkFilename: "css/[name].chunk.css"
      }),
      new HtmlWebpackPlugin({
        filename: `index.html`,
        inject: 'body',
        hash: true,
        template: path.join(__dirname, "../src/index.html"), // 这里是 以这个 plugin.js 文件的路径为基础
        chunks: ["manifest", "vendor", "index", "commonMain"],
      }),
       new HtmlWebpackPlugin({
        filename: `login.html`,
        inject: 'body',
        hash: true,
        template: path.join(__dirname, "../src/login.html"), // 这里是 以这个 plugin.js 文件的路径为基础
        chunks: ["manifest", "vendor", "login", "commonMain"],
      }),
      new ProgressBarPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          { from: './src/assert', to: './assert' },
        ],
      }),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(), // 模块的热替换
      new webpack.NamedModulesPlugin(), // 热更新时显示更新的模块的名字，默认是模块的id
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    ];
};
