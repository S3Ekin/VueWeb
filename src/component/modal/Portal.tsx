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
        //   const head = this.$slots.default!
        //  console.log(this.$slots)
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const parent = this
        this.targetComponent = new Vue({
            el: targetDom,
            updated: function () {
                console.log("err")
            },
            render: function ():VNode {
              const head = parent.$slots.default!
               return (
                <div class="g-modal">
                    {head}
                </div>
               )
            }
        })
    }

    updated ():void {
        console.log("portal updata")
        console.log(this.targetComponent)
        this.targetComponent?.$forceUpdate()
    }

    destroyed ():void{
        this.targetComponent?.$destroy()
        if (this.container) {
            this.container.removeChild(this.targetComponent!.$el)
        }
    }

    render ():VNode {
        return <span>测试</span>
    }
}
