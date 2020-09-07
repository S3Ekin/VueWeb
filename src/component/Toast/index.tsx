/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author: SEKin ;
 * @Date: 2020-08-26 17:29:32 ;
 * @description: 弹框 ;
 * @Last Modified time: 2020-08-26 17:29:32 ;
 */

import { CombinedVueInstance } from "vue/types/vue"
import Toast from "@component/Toast/Toast.vue"
import { DefaultComputed, DefaultProps } from "vue/types/options"
type messageItem = {
    id: string;
    text: string;
    type: "error" | "success" | "warn";
    timerId?:number;
};

type ToastCom = CombinedVueInstance<Toast, {
    messages: messageItem[]
}, {
    add:(message:messageItem)=>void;
    clear:()=>void;
}, DefaultComputed, DefaultProps>

let ToastRef: null | ToastCom = null

let numId = 0
const createTimekey = function () {
    return new Date().getTime() + "" + numId++
}

const createNotice = function (callback?:()=>void):void {
    const wrap = document.getElementById("innerToastRoot")!
    ToastRef = new Toast().$mount(wrap) as ToastCom
    ToastRef.$nextTick().then(() => {
       callback && callback()
    })
}

const addFn = function (messages:messageItem, keep?:boolean) {
    let timerId:number | undefined
    if (!keep) {
        const { type } = messages
        const time = type === "error" ? 3000 : type === "warn" ? 2000 : 500
        timerId = window.setTimeout(function () {
            ToastRef!.remove(messages.id)
        }, time)
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
    update: function ():void {
        if (ToastRef) {
            ToastRef.$forceUpdate()
        }
    },
    clear: function ():void {
        if (ToastRef) {
            console.log(ToastRef.$data)
            ToastRef.clear()
        }
    }
}
export { createNotice }
export default toastFn
