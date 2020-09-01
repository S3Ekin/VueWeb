/**
 * @author: SEKin ;
 * @Date: 2020-08-16 17:42:09 ;
 * @description:  路由管理;
 * @Last Modified time: 2020-08-16 17:42:09 ;
 */
import VueRouter from "vue-router"
import application from "./application/index.vue"
import { CreateElement } from "vue/types/umd"
const page1 = {
  render: function (h:Vue.CreateElement) {
    return h(application)
  }
}
const page2 = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: function (h:CreateElement) {
    return <div>page2</div>
  }
}
const router = new VueRouter({
 // mode: 'history',
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/system/application', component: page1 },
    {
      path: '/company/company',
      component: () => {
        return import(
          /* webpackChunkName: "company" */ "./company/index.vue"
        )
      }
    },
    { path: '/system/menu', component: page2 },
    {
      path: '/user/user',
      component: () => {
        return import("./user/index.vue")
      }
    }
  ]
})

export {
  router
}
