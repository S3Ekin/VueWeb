/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
import App from "./App.vue"
type hotApi = {
  install: any;
  createRecord: any;
  rerender: any; // 如果一个组件只是修改了模板或是 render 函数，
  reload: any; // 如果一个组件更改了除 template 或 render 之外的选项，
  compatible: boolean; // 在安装之后使用 api.compatible 来检查兼容性
}
new Vue({
  // 注意要是不用render 方法渲染组件，直接把配置传入会导致 热更新失败
  render: function (h) {
    return h(App)
  }
}).$mount("#app")
if (module.hot) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const api: hotApi = require('vue-hot-reload-api')
  api.install(Vue)
  if (!api.compatible) {
    throw new Error('vue-hot-reload-api与当前Vue的版本不兼容')
  }
  module.hot.accept()
  if (!module.hot.data) {
    api.createRecord('very-unique-id', App)
  } else {
    api.reload('very-unique-id', App)
  }
}
