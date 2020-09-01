/* eslint-disable @typescript-eslint/no-explicit-any */
// Make sure to register before importing any components
import "@component/class-component-hooks"
import Vue from 'vue'
import App from "./App.vue"
import VueRouter from "vue-router"
import "./css/common/common.scss"
import "./assert/fonts/iconfont.js"
import 'vx-easyui/dist/themes/default/easyui.css'
import 'vx-easyui/dist/themes/icon.css'
import 'vx-easyui/dist/themes/vue.css'
import { router } from "./js/Router"
import EasyUI from 'vx-easyui'
Vue.use(EasyUI)
Vue.use(VueRouter)
new Vue({
  router,
  // 注意要是不用render 方法渲染组件，直接把配置传入会导致 热更新失败
  render: function (h) {
    return h(App)
  }
}).$mount("#app")
