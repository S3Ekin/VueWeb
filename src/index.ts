/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
import App from "./App.vue"

// new Vue({
//   // 注意要是不用render 方法渲染组件，直接把配置传入会导致 热更新失败
//   render: function (h) {
//     return h(App)
//   }
// }).$mount("#app")
new Vue(App).$mount("#app")
