/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @author: SEKin ;
 * @Date: 2020-08-16 17:42:09 ;
 * @description:  路由管理;
 * @Last Modified time: 2020-08-16 17:42:09 ;
 */
import Vue from "vue"

type data = any;

const page1 = {
  render: function (h:any) {
    return <div>page1</div>
  }
}
const page2 = {
  render: function (h:any) {
    return <div>page2</div>
  }
}
const router = {
    "/system/application": page1,
    "/system/menu": page2
}

// eslint-disable-next-line @typescript-eslint/ban-types
export default Vue.extend<data, {}, {}>({
  data: function () {
        return {
            currentRoute: window.location.pathname
        }
  },
  computed: {
    ViewComponent () {
      return router[this.currentRoute as keyof typeof router] || {
        render: function (h) {
          return h("p", window.location.href)
        }
      }
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})
