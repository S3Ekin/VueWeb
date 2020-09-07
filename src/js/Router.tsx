/**
 * @author: SEKin ;
 * @Date: 2020-08-16 17:42:09 ;
 * @description:  路由管理;
 * @Last Modified time: 2020-08-16 17:42:09 ;
 */
import VueRouter from "vue-router"
import noticeFn from "@component/Toast/index"
import LoadingFn from "@component/loading/index"

const router = new VueRouter({
 mode: 'abstract', // 参数不变化的模式（react的内存模式）
  routes: [
    // 动态路径参数 以冒号开头
    {
      path: '/system/application',
      component: () => {
        return import(
            /* webpackChunkName: "application" */ "./application/index.vue"
          )
      }
  },
    {
      path: '/company/company',
      component: () => {
        return import(
          /* webpackChunkName: "company" */ "./company/index.vue"
        )
      }
    },
    {
      path: '/system/menu',
      component: () => {
        return import(
          /* webpackChunkName: "company" */ "./menu/index.vue"
        )
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
  noticeFn.clear()
  LoadingFn.close()
})

export {
  router
}
