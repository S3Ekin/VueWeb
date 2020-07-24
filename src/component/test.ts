import Vue from "vue"
import Child from "./testChild"
const test: Vue.ComponentOptions<Vue> = {
  name: "test",
  data: function ():{d:number} {
    return {
      d: 124
    }
  },
  components: {
    Child
  },
  template: `<div >
    <p>test.ts 属性传递：{{t}}</p>
    标签的内容childText: {{$slots.default[0].text}}
    <child>子 dsf</child>
  </div>`,
  props: {
    t: String
  }
}
export default test
