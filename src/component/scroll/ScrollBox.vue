<template>
  <div
    ref="box"
    class="g-scrollBox"
    :style="{height: height ? height +'px':null}"
    @mouseenter="mouseOver"
    @mouseleave="mouseLeave"
    @mousewheel="mousewheel"
  >
    <div class="m-scrollMain">
      <slot @hook:created="fn" />
    </div>
    <div
      v-show="showBar"
      class="m-scrollBar"
    >
      <div
        class="m-moveBar"
        :style="{height: moveBarH + 'px',top:'0px'}"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
@Component({
    name: "ScrollBox",
    components: {
    }
})
export default class Table extends Vue {
    @Prop(Boolean) hasBorder?:boolean;
    @Prop(Number) height?:number;
    $refs!:{
      box:HTMLDivElement
    }

    showBar = false
    moveBarH = 0
    timer = 0
    record = 0
    queueArr:number[] = []
    scrollBoxH = 0
    scrollMian = 0

    fn ():void {
      console.log(12)
    }

    mouseOver (e:MouseEventEl<HTMLDivElement>):void {
      const dom = e.currentTarget
      const scrollBoxH = dom.clientHeight
      this.scrollBoxH = scrollBoxH
      const scrollMainH = (dom.firstElementChild as HTMLDivElement)!.clientHeight
      this.scrollMian = scrollMainH
      if (scrollMainH > scrollBoxH) {
        this.showBar = true
        this.moveBarH = Math.ceil((scrollBoxH / scrollMainH) * scrollBoxH)
        const barInner = dom.lastElementChild!.firstElementChild! as HTMLDivElement
        const maxH = this.scrollBoxH - this.moveBarH
        const startH = parseInt(barInner.style.top)
        if (startH > maxH) {
          const factor = (this.scrollMian - this.scrollBoxH) / maxH
          barInner.style.top = maxH + "px";
          (dom.firstElementChild as HTMLDivElement).style.top = -maxH * factor + "px"
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updated (...args:any[]):void{
      console.log("update")
      console.log(args)
    }

    mouseLeave ():void {
     this.showBar = false
    }

    easeInOutCubic (x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
    }

    queueFn (count:number, startH:number, innerBarDom:HTMLDivElement):void {
        this.timer = window.setTimeout(() => {
          const moveH = count * 25
          console.log(count, moveH)
          innerBarDom.style.top = moveH + "px"
          if (this.queueArr.length) {
            const recoder = this.queueArr.shift()!
            this.queueFn(recoder, startH, innerBarDom)
          } else {
            this.timer = 0
            this.record = 0
          }
        }, 40)
    }

    mousewheel (e:WheelEvent):void {
      if (!this.showBar) {
        return
      }
      this.record++
      this.queueArr.push(this.record)
      if (this.timer) {
        return
      }
      // 从静止开始启动
      const dom = e.currentTarget as HTMLDivElement
      const barInner = dom.lastElementChild!.firstElementChild! as HTMLDivElement
      if (!barInner) {
        throw new Error("dom")
      }
      const startH = parseInt(barInner.style.top)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const step = (e as any).wheelDelta > 0 ? -8 : 8
      let h = startH + step
      const maxH = this.scrollBoxH - this.moveBarH
       h = h < 0 ? 0 : h > maxH ? maxH : h
       const factor = (this.scrollMian - this.scrollBoxH) / maxH
       barInner.style.top = h + "px";
      (dom.firstElementChild as HTMLDivElement).style.top = -h * factor + "px"

     // const recoder = this.queueArr.shift()!
    //  this.queueFn(recoder, startH, barInner)
    }
}
</script>

<style lang="scss">
@import "../../css/scss/variate";
$barW:12px;
$barInnerW: 8px;

.g-scrollBox {
  overflow: hidden;
  height: 100%;
  position: relative;
  min-height: 60px;

  .m-scrollBar {
    position: absolute;
    height: 100%;
    background: violet;
    top: 0;
    right: 0;
    width: $barW;
    opacity: 0.85;
    border-radius: $barW;
    padding: 6px ($barW - $barInnerW ) / 2;
    z-index: 2;
  }

  .m-scrollMain {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }

  .m-moveBar {
    width: $barInnerW;
    background: red;
    border-radius: $barInnerW;
    cursor: pointer;
    position: absolute;

    &:hover {
      background: darken($color:red, $amount: 40);
    }
  }
}
</style>
