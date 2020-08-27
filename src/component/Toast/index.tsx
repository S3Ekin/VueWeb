/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author: SEKin ;
 * @Date: 2020-08-26 17:29:32 ;
 * @description: 弹框 ;
 * @Last Modified time: 2020-08-26 17:29:32 ;
 */

import Vue, { CreateElement } from "vue"
// import Notice from "./Notice.vue"
import { CombinedVueInstance } from "vue/types/vue"
import Test from "@component/Toast/Toast.vue"
type messageItem = {
    id: string;
    text: string;
    type: "error" | "success" | "warn";
    timerId?:number;
};

let ToastRef: null | CombinedVueInstance<Vue, {
    messages: messageItem[]
}, {
    add:()=>void
}, any, any> = null
let numId = 0
const createTimekey = function () {
    return new Date().getTime() + "" + numId++
}
const data: {
    messages:messageItem[]
} = {
    messages: []
}
const createNotice = function (callback?:()=>void):void {
    const wrap = document.getElementById("innerToastRoot")!
   ToastRef = new Test({
        propsData: {
            callback
        }
    }).$mount(wrap)
    ToastRef.$nextTick().then(() => {
        console.log("next")
       callback && callback()
    })
    // new Vue({
    //     el: wrap,
    //     name: "Toast",
    //     components: {
    //         Notice
    //     },
    //     data,
    //     mounted: function ():void {
    //         this.$nextTick().then(() => {
    //             callback && callback()
    //         })
    //     },
    //     methods: {
    //         add (obj: messageItem) {
    //                 this.messages.push(obj)
    //             },

    //         clickFn (e:MouseEventEl<HTMLDivElement>) {
    //             const dom = e.currentTarget!
    //             const id = dom.dataset.id!
    //             this.remove(id)
    //         },

    //         remove (id:string) {
    //             this.messages = this.messages.filter(val => {
    //                 return val.id !== id
    //             })
    //         },

    //         clear () {
    //             const messages = this.messages
    //             if (!messages.length) {
    //                 return
    //             }
    //             // 清除定时器
    //             messages.forEach(val => {
    //                 const { timerId } = val
    //                 if (timerId) {
    //                     window.clearTimeout(timerId)
    //                 }
    //             })
    //             this.messages.length = 0
    //         }
    //     },
    //     render (h:CreateElement) {
    //         const child = this.messages.map(val => {
    //             const { text, id, type } = val
    //             return (
    //                 <Notice
    //                 id={id}
    //                 type={type}
    //                 >
    //                     {text}
    //                 </Notice>
    //             )
    //         })
    //         return (
    //             <div>
    //                 {child}
    //             </div>
    //         )
    //     }
    // })
}

const addFn = function (messages:messageItem, keep?:boolean) {
    let timerId:number | undefined
    if (!keep) {
        timerId = window.setTimeout(function () {
            ToastRef!.remove(messages.id)
        }, 2000)
        messages.timerId = timerId
    }
    ToastRef!.add(messages)
}

const toastFn = {
    // 添加提示
    add: function (
        text: string,
        type: messageItem["type"] = "success",
        keep?:boolean// 是否保持，true不关闭
    ):void {
        const id = createTimekey()
        console.log(id)
        const obj:messageItem = {
            id,
            type,
            text
        }
        if (!ToastRef) {
            createNotice(function () {
                addFn(obj, keep)
            })
        } else {
            addFn(obj, keep)
        }
    },
    clear: function ():void {
        if (ToastRef) {
            ToastRef.clear()
        }
    }
}
export { createNotice }
export default toastFn
