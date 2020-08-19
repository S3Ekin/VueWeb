/**
 * @author: SEKin ;
 * @Date: 2020-08-19 11:34:22 ;
 * @description: 登录页 ;
 * @Last Modified time: 2020-08-19 11:34:22 ;
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
import "./css/common/common.scss"
import "@css/page/login.scss"
import Login from "@js/login/index.vue"
new Vue({
  // 注意要是不用render 方法渲染组件，直接把配置传入会导致 热更新失败
  render: function (h) {
    return h(Login)
  }
}).$mount("#app")
