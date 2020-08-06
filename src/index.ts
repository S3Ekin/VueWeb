/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
import App from "./App.vue"
import "./css/common/common.scss"
import { fetchApi } from "@api/postData"
new Vue({
  // 注意要是不用render 方法渲染组件，直接把配置传入会导致 热更新失败
  render: function (h) {
    return h(App)
  }
}).$mount("#app")
window.loginApp = function () {
fetchApi.postJson("login/loginValue", {
    code: "demo",
    password: "F59BD65F7EDAFB087A81D4DCA06C4910"
})
}
