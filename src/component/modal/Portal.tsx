/**
 * @author: SEKin;
 * @Date: 2020-08-25 10:44:56 ;
 * @description: 实现Portal原理 ;
 * @Last Modified time: 2020-08-25 10:44:56 ;
 */
import Vue, { VNode } from "vue"
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
         const targetDom = document.createElement("div")
        this.container.appendChild(targetDom)
        const head = this.$slots.default!
        console.log(this.$slots)
        this.targetComponent = new Vue({
            el: targetDom,
            render: function ():VNode {
               return (
                <div class="g-modal">
                    {head}
                </div>
               )
            }
        })
    }

    destroyed ():void{
        this.targetComponent?.$destroy()
        this.container.removeChild(this.targetComponent!.$el)
    }

    render ():VNode {
        return <span>测试</span>
    }
}
