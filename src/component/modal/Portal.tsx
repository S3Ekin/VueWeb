/**
 * @author: SEKin;
 * @Date: 2020-08-25 10:44:56 ;
 * @description: 实现Portal原理 ;
 * @Last Modified time: 2020-08-25 10:44:56 ;
 */
import Vue, { VNode, CreateElement } from "vue"
import Component from "vue-class-component"
const PortalProps = Vue.extend({
    name: "Portal",
    props: {
         container: {
             type: HTMLElement,
             required: true
         }
    }
})
@Component
export default class Portal extends PortalProps {
    targetComponent:null | Vue = null

    mounted ():void {
        console.log(1)
         const targetDom = document.createElement("div")
        this.container.appendChild(targetDom)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const chidldFn:any = () => {
            return this.$scopedSlots.default!({})
        }
        this.targetComponent = new Vue({
            el: targetDom,
            render: function ():VNode {
               return chidldFn()
            }
        })
    }

    updated ():void {
        this.targetComponent?.$forceUpdate()
    }

    destroyed ():void{
        this.targetComponent?.$destroy()
        if (this.container) {
            this.container.removeChild(this.targetComponent!.$el)
        }
    }

    render (h:CreateElement):VNode {
        return h()
    }
}
