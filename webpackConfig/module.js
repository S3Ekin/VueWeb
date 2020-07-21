/**
 * @name SEkin
 * @description description
 * @time 2020-07-10
 */
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = function (isDev) {
    const parse = isDev ? {
      loader: "ts-loader",
      options: {
        configFile: path.join(__dirname,"../tsconfig.json"),
      }
    } : {
      loader: "babel-loader",
      options: {
      }
    };
    const eslintPath = isDev ? "../.eslintrc.json" :"../.eslintrc.build.js";
    return {
      rules: [
        {
          test: /\.ts$/,
          enforce: 'pre',
          exclude: /node_modules|assert/, // 排除不处理的目录
          use: [ 
            parse,
            {
              loader: 'eslint-loader',
              options:{
                eslintPath: path.join(__dirname, eslintPath)
              }
            },
          ],
        },
        {
          test: /.(css|scss)$/,
          exclude: /assert/, // 排除不处理的目录
          // exclude: /node_modules|assert/, // 排除不处理的目录
          // include: path.resolve(__dirname, 'src'), // 精确指定要处理的目录
          use: [
            !isDev
              ? {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '/',
                  },
                }
              : {
                  loader: 'style-loader',
                },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(jpg|png|ico|jpeg|gif)$/,
          // exclude: /assert/, // 排除不处理的目录
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]',
                limit: 100,
                publicPath: '../img', // 文件中 替换有关图片路径的引用 为这个
                outputPath: 'img/', // 文件的输出位置路径 是相对于入口文件的路径
                // 有关webpack 打包时路径问题看这个 
                // https://juejin.im/post/5b8d1e926fb9a019b66e4657#comment  
                // https://www.jianshu.com/p/d3f34c3872a5
              },
            },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          //  exclude://,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 5000,
                name: '[name].[ext]',
                publicPath: '../fonts/',
                outputPath: 'fonts/',
              },
            },
          ],
        },
      ],
    };
};
