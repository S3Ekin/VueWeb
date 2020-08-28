/**
 * @author: SEKin ;
 * @Date: 2020-08-27 17:05:47 ;
 * @description: Loaidng 方法 ;
 * @Last Modified time: 2020-08-27 17:05:47 ;
 */

import Loading from "./Loading.vue"
import { CombinedVueInstance } from "vue/types/vue"
import { DefaultData, DefaultComputed, DefaultProps } from "vue/types/options"
type loadCom = CombinedVueInstance<Loading, DefaultData<{
    show: boolean;
    loadTxt:string;
}>, {
    open: (txt?:string)=>void;
    close: ()=>void;
}, DefaultComputed, DefaultProps>

let LoadingRef: null | loadCom

const createLoading = function (callback?:()=>void):void {
    const wrap = document.getElementById("innerLoading")!
    LoadingRef = new Loading().$mount(wrap) as loadCom
    LoadingRef.$nextTick().then(() => {
       callback && callback()
    })
}

const loadFn = {

    open: function (txt?:string):void {
        if (!LoadingRef) {
            createLoading(function () {
                LoadingRef!.open(txt)
            })
        } else {
                LoadingRef!.open(txt)
        }
    },
    close: function ():void {
        if (LoadingRef) {
            LoadingRef.close()
        }
    }
}
export { createLoading }
export default loadFn
