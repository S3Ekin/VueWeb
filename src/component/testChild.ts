import Vue from "vue"
import Test from "./test3"

const obj: Vue.ComponentOptions<Vue> = {
    props: ["a"],
    name: "child",
    components: {
        Test
    },
    // template: "<p>234 <button-counter>a</button-counter></p>",
    render: function (this: Vue, create) { // 源码最终都会落到这个函数来渲染成 vnode 也就是虚拟dom
        const vnode = create("p", [
            "6666#####66",
            create(Test)
        ])
        console.log(vnode)
        return vnode
    }
}
export default obj
