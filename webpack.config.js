/**
 * @author: SEKin 
 * @Date: 2020-07-20 14:53:53 
 * @description:  
 * @Last Modified time: 2020-07-20 14:53:53 
 */
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const pluginFn = require("./webpackConfig/plugin");
const moduleFn = require("./webpackConfig/module");
const devServerFn = require("./webpackConfig/devServer");
const optimizationFn = require("./webpackConfig/optimization");

module.exports = function (env) {
    const dev = env === "dev"
    return {
      devtool: dev? 'eval-source-map' : 'none',
      entry: {
        index: "./src/index.ts",
      },
      output: {
        path: path.join(__dirname, "dist"),
        filename: "js/[name].js",
        publicPath: "/",
        chunkFilename: dev
				? "js/[name].[hash].chunk.js"
				: "js/[name].[chunkhash:5].js",
      },
      resolve: {
        extensions: [".js", ".css", ".tsx", ".json", ".scss", ".ts",".vue"],
        modules: ["node_modules"],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
        alias: {
          //配置绝对路径的文件名
          css: path.join(__dirname, "src/css"),
          js: path.join(__dirname, "src/js"),
          api: path.join(__dirname, "src/api"),
          assert: path.join(__dirname, "src/assert"),
          vue: 'vue/dist/vue.esm.js',
        },
      },
      mode: dev ? "development" : "production",
      devServer: devServerFn(),
      module: moduleFn(dev),
      plugins: pluginFn(dev),
      optimization: optimizationFn(),
    };
   
}