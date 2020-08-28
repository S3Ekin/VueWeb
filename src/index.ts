/* eslint-disable @typescript-eslint/no-explicit-any */
// Make sure to register before importing any components
import "@component/class-component-hooks"
import Vue from 'vue'
import App from "./App.vue"
import VueRouter from "vue-router"
import "./css/common/common.scss"
import "./assert/fonts/iconfont.js"
import { router } from "./js/Router"

Vue.use(VueRouter)
new Vue({
  router,
  // 注意要是不用render 方法渲染组件，直接把配置传入会导致 热更新失败
  render: function (h) {
    return h(App)
  }
}).$mount("#app")
