/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @author: SEKin ;
 * @Date: 2020-08-16 17:42:09 ;
 * @description:  路由管理;
 * @Last Modified time: 2020-08-16 17:42:09 ;
 */
import VueRouter from "vue-router"
import application from "./application/index.vue"
const page1 = {
  render: function (h:any) {
    return h(application)
  }
}
const page2 = {
  render: function (h:any) {
    return <div>page2</div>
  }
}
const router = new VueRouter({
  mode: 'history',
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/system/application', component: page1 },
    { path: '/system/menu', component: page2 }
  ]
})

export {
  router
}
