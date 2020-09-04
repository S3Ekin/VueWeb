import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
      user: {
        id: 1,
        code: "demo",
        name: "系统管理员",
        roles: {
            kpi: "60",
            index: "58",
            portal: "73",
            user: "1"
        },
        level: "admin",
        email: "",
        departmentId: 2,
        departmentName: "信息科"
      },
      token: ""
  },
  mutations: {
  }
})

export default store
