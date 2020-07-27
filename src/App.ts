import Vue from "vue"
import Test from "./component/test"
// 定义一个名为 button-counter 的新组件,这是全局组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<p><b>App.ts 全局的组件注册</b></p>'
})
const obj: Vue.ComponentOptions<Vue> = {
  el: "#app",
  data: {
    message: 'Hel2o 幅度erer萨芬啊手动3阀!',
    t: 'eeeee',
    child: "child"
  },
  template: `<div id="app">
    <p>App.ts :{{message}}</p>   
    <test v-bind:t="t">555555ed5</test>
  </div>`,
  components: {
    Test
  }
}
export default obj
