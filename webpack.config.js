/**
 * @author: SEKin 
 * @Date: 2020-07-20 14:53:53 
 * @description:  
 * @Last Modified time: 2020-07-20 14:53:53 
 */

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const pluginFn = require("./webpackConfig/plugin");
const moduleFn = require("./webpackConfig/module");
const optimizationFn = require("./webpackConfig/optimization");

module.exports = function (env) {
    const dev = env === "dev"
    return {
      entry: {
        index: "./src/index.js",
      },
      output: {
        path: "./dist",
        filename: "js/[name].js",
      },
      resolve: {
        extensions: [".js", ".css", ".tsx", ".json", ".scss", ".ts"],
        modules: ["node_modules"],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
        alias: {
          //配置绝对路径的文件名
          css: path.join(__dirname, "src/css"),
          js: path.join(__dirname, "src/js"),
          api: path.join(__dirname, "src/api"),
          assert: path.join(__dirname, "src/assert"),
        },
      },
      mod: dev ? "development" : "production",
      devserver: {},
      module: moduleFn(dev),
      plugin: pluginFn(dev),
      optimization: optimizationFn(),
    };
   
}