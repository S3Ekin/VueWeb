<template>
  <div
    class="g-scrollBox"
    :style="{height: height ? height +'px':null}"
    @mouseenter="mouseOver"
    @mouseleave="mouseLeave"
    @mousewheel="mainMousewheel"
  >
    <ScrollMain @hook:updated="upDateInit">
      <slot />
    </ScrollMain>
    <div
      v-show="showBar"
      class="m-scrollBar"
    >
      <div
        ref="moveBar"
        class="m-moveBar"
        :style="{height: moveBarH + 'px',top:'0px'}"
        @mousedown="barClick"
        @mouseup="cancelBarWheel"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import ScrollMain from "./ScrollMain"
@Component({
    name: "ScrollBox",
    components: {
      ScrollMain
    }
})
export default class Table extends Vue {
    @Prop(Boolean) hasBorder?:boolean;
    @Prop(Number) height?:number;
    $refs!: {
      moveBar:HTMLDivElement
    }

    showBar = false
    moveBarH = 0
    scrollBoxH = 0
    scrollMainH = 0
    mounted ():void {
      this.upDateInit()
    }

    upDateInit ():void { // 在 scrollMain 更新时和 鼠标划入整个div时， 会调用
      const barInner = this.$refs.moveBar
      const scrollMain = barInner.parentElement!.previousElementSibling! as HTMLDivElement

      const curScrollMainH = scrollMain.clientHeight
      if (curScrollMainH === this.scrollMainH) { // 鼠标划入整个div时
        return
      }
      this.scrollBoxH = barInner.parentElement!.parentElement!.clientHeight
      this.scrollMainH = curScrollMainH
      if (curScrollMainH < this.scrollBoxH) { // 没有超出容器
        scrollMain.style.top = 0
        return
      }
      let moveBarH = Math.ceil((this.scrollBoxH / curScrollMainH) * this.scrollBoxH)
       moveBarH = Math.max(16, moveBarH)
      this.moveBarH = moveBarH

      let curScrollMainTop = -parseInt(scrollMain.style.top || 0)
      if ((curScrollMainTop + this.scrollBoxH) > curScrollMainH) { // 上次的scrollMain下滑的长度 大于现在的scrollMainH 整体的长度时，把现在的scrollMainH 下滑到最后
          curScrollMainTop = (curScrollMainH - this.scrollBoxH)
          scrollMain.style.top = -curScrollMainTop + "px"
      }
      // 重计算 moveBar的位置，因为scroll变化了
       const maxH = this.scrollMainH - this.scrollBoxH
       const factor = (this.scrollBoxH - this.moveBarH) / maxH
       barInner.style.top = factor * curScrollMainTop + "px"
    }

    barWheel (e:MouseEventEl<HTMLDivElement>):void {
     // 从静止开始启动
      console.log(e)
      const dom = e.currentTarget as HTMLDivElement
      const scrollMain = dom.parentElement!.previousElementSibling! as HTMLDivElement
      const startH = +dom.dataset.top
      const moveDistance = +dom.dataset.y - e.clientY
      const maxH = this.scrollBoxH - this.moveBarH

      let h = startH + moveDistance
       h = h < 0 ? 0 : h > maxH ? maxH : h

       const factor = (this.scrollMainH - this.scrollBoxH) / maxH
       dom.style.top = h + "px"
       scrollMain.style.top = -h * factor + "px"
    }

    barClick (e:MouseEventEl<HTMLDivElement>):void {
      e.currentTarget!.dataset.y = e.clientY
      e.currentTarget!.dataset.top = parseInt(e.currentTarget!.style.top || 0)
      this.$refs.moveBar.addEventListener("mousemove", this.barWheel)
    }

    cancelBarWheel ():void {
       this.$refs.moveBar.removeEventListener("mousemove", this.barWheel)
    }

    beforeDestroy ():void {
       this.$refs.moveBar.removeEventListener("mousemove", this.barWheel)
    }

    barinnerMove (e:MouseEventEl<HTMLDivElement>) :void {
      const dom = e.currentTarget
      const scrollBoxH = dom.clientHeight
      const scrollMainH = (dom.firstElementChild as HTMLDivElement)!.clientHeight
      this.scrollBoxH = scrollBoxH
      this.scrollMainH = scrollMainH
      if (scrollMainH > scrollBoxH) {
        this.showBar = true
        const moveBarH = Math.ceil((scrollBoxH / scrollMainH) * scrollBoxH)
        this.moveBarH = Math.max(16, moveBarH)
        const barInner = dom.lastElementChild!.firstElementChild! as HTMLDivElement
        const maxH = this.scrollBoxH - this.moveBarH
        const startH = parseInt(barInner.style.top)
        if (startH > maxH) {
          const factor = (this.scrollMainH - this.scrollBoxH) / maxH
          barInner.style.top = maxH + "px";
          (dom.firstElementChild as HTMLDivElement).style.top = -maxH * factor + "px"
        }
      }
    }

    mouseOver (e:MouseEventEl<HTMLDivElement>):void {
      const dom = e.currentTarget
      if (!dom.firstElementChild) {
        return
      }
      if (this.scrollMainH > this.scrollBoxH) {
        this.showBar = true
      }
    }

    mouseLeave ():void {
     this.showBar = false
    }

    mainMousewheel (e:WheelEvent):void {
      if (!this.showBar) {
        return
      }
      // 从静止开始启动
      const dom = e.currentTarget as HTMLDivElement
      const scrollMain = dom.firstElementChild! as HTMLDivElement
      const startH = parseInt(scrollMain.style.top || 0)
      let step = Math.sqrt(this.scrollMainH / this.scrollBoxH) * 12
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      step = (e as any).wheelDelta > 0 ? step : -step
      let h = -(startH + step)
      const maxH = this.scrollMainH - this.scrollBoxH
       h = h < 0 ? 0 : h > maxH ? maxH : h
       const factor = (this.scrollBoxH - this.moveBarH) / maxH
       scrollMain.style.top = -h + "px"
       this.$refs.moveBar.style.top = h * factor + "px"
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