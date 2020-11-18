/**
 * @author: SEKin ；
 * @Date: 2020-11-18 16:43:20 ；
 * @description:  点击空白处，自动收缩所有的类名为m-drop的下拉面板；
 * @Last Modified time: 2020-11-18 16:43:20 ；
 */
type fn = (arg: HTMLElement)=>void

const event = {
    on: function (k:string, fn: fn):void {
       eventData[k] = fn
    },
    emit: function (k:string, argObj:HTMLElement):void {
        const fn = eventData[k]
        if (!fn) {
            return
        }
        eventData[k](argObj)
    },
    remove: function (k:string):void{
        if (eventData[k]) {
            delete eventData[k]
        }
    }
}
const slideOther = (excludekey?:string):void => {
  const activeCom = document.querySelector(".m-drop.active") as HTMLDivElement
  if (!activeCom) {
    return
  }
  const k = activeCom.dataset.event!
  if (excludekey && excludekey === k) {
    return
  }
  event.emit(k, activeCom)
}

const eventData:{
    [key:string]: fn
} = {}
document.body.addEventListener("click", function () {
  slideOther()
})
export {
    slideOther,
    event
}
