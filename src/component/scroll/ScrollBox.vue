<template>
  <div
    class="g-scrollBox"
    :class="className"
    :style="{height: height ? height +'px':null}"
    @mouseenter="mouseOver"
    @mouseleave="mouseLeave"
    @mousewheel="mainMousewheel"
    @mouseup="cancelBarWheel"
  >
    <ScrollMain @hook:updated="childChange">
      <slot />
    </ScrollMain>
    <div
      v-show="showBar"
      class="m-scrollBar"
      @click="locateBar"
    >
      <div
        ref="moveBar"
        class="m-moveBar"
        :style="{height: moveBarH + 'px',top:'0px'}"
        @mousedown="barClick"
        @click.stop=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import ScrollMain from "./ScrollMain.vue"
import { IScrollMethods } from "./scroll"
import { fnUtil } from "@component/util/jsUtil"
@Component({
    name: "ScrollBox",
    components: {
      ScrollMain
    }
})
export default class Table extends Vue {
    @Prop(Number) height?:number;
    @Prop(String) className?:string;
    @Prop(Number) time?:number; // 有的scroll主体的高度变化是有动画的，需要过一段动画时间才能获取到最终的高度，这里传入动画时间。
    @Prop() bindIntiScroll?:(scrollMethods:IScrollMethods)=>void;
    @Prop(Boolean) keepBarShow?:boolean;
    @Prop(Boolean) noStopPageScroll?:boolean;

    barMoveEven = fnUtil.throttle(this.barMove, 100) as (e:MouseEvent)=>void;

    $refs!: {
      moveBar:HTMLDivElement
    }

    showBar = false
    moveBarH = 0
    scrollBoxH = 0
    scrollMainH = 0
    created ():void {
      this.showBar = !!this.keepBarShow
      if (this.bindIntiScroll) {
        this.bindIntiScroll(this.scrollMethods)
      }
    }

    scrollMethods:IScrollMethods = {
      initScroll: this.upDateInit,
      scrollToTop: this.scrollToTop
    }

    scrollToTop (top:number):void{
      const { moveBarH } = this
      const scrollMain = this.$refs.moveBar!.parentElement!.previousElementSibling as HTMLDivElement
      let h = top
      const maxH = this.scrollMainH - this.scrollBoxH
      if (maxH <= 0) { // 没有超出
        return
      }
      h = h < 0 ? 0 : h > maxH ? maxH : h
      const factor = (this.scrollBoxH - moveBarH) / maxH
      scrollMain.style.top = `${-h}px`
      this.$refs.moveBar!.style.top = `${h * factor}px`
    }

    childChange ():void {
      if (this.time) {
        window.setTimeout(() => {
          this.upDateInit(this.height)
        }, this.time)
      } else {
        this.upDateInit(this.height)
      }
    }

    mounted ():void {
      this.upDateInit(this.height)
    }

    upDateInit (defaultH?:number):void { // 在 scrollMain 更新时和 鼠标划入整个div时， 会调用
      const barInner = this.$refs.moveBar
      const scrollMain = barInner.parentElement!.previousElementSibling! as HTMLDivElement

      const curScrollMainH = scrollMain.clientHeight
      if (!defaultH && curScrollMainH === this.scrollMainH) { // 鼠标划入整个div时
        return
      }
      this.scrollBoxH = defaultH || barInner.parentElement!.parentElement!.clientHeight
      this.scrollMainH = curScrollMainH
      if (curScrollMainH < this.scrollBoxH) { // 没有超出容器
        scrollMain.style.top = "0"
        this.showBar = false
        return
      }
      let moveBarH = Math.ceil((this.scrollBoxH / curScrollMainH) * this.scrollBoxH)
       moveBarH = Math.max(16, moveBarH)
      this.moveBarH = moveBarH
      let curScrollMainTop = -parseInt(scrollMain.style.top || "0")
      if ((curScrollMainTop + this.scrollBoxH) > curScrollMainH) { // 上次的scrollMain下滑的长度 大于现在的scrollMainH 整体的长度时，把现在的scrollMainH 下滑到最后
          curScrollMainTop = (curScrollMainH - this.scrollBoxH)
          scrollMain.style.top = -curScrollMainTop + "px"
      }
      // 重计算 moveBar的位置，因为scroll变化了
       const maxH = this.scrollMainH - this.scrollBoxH
       const factor = (this.scrollBoxH - this.moveBarH) / maxH
       barInner.style.top = factor * curScrollMainTop + "px"
       this.showBar = true
    }

    barMove (e:MouseEventEl<HTMLDivElement>):void {
      e.stopPropagation()
     // 从静止开始启动
      const dom = this.$refs.moveBar
      const scrollMain = dom.parentElement!.previousElementSibling! as HTMLDivElement
      const startH = +dom.dataset.top!
      const moveDistance = e.clientY - +dom.dataset.y!
      const maxH = this.scrollBoxH - this.moveBarH

      let h = startH + moveDistance
       h = h < 0 ? 0 : h > maxH ? maxH : h

       const factor = (this.scrollMainH - this.scrollBoxH) / maxH
       dom.style.top = h + "px"
       scrollMain.style.top = -h * factor + "px"
    }

    barClick (e:MouseEventEl<HTMLDivElement>):void {
      e.currentTarget!.dataset.y = e.clientY + ""
      e.currentTarget!.dataset.top = parseInt(e.currentTarget!.style.top || "0") + ""
      e.currentTarget.parentElement!.parentElement!.addEventListener("mousemove", this.barMoveEven)
    }

    cancelBarWheel ():void {
      this.$refs.moveBar!.parentElement!.parentElement!.removeEventListener("mousemove", this.barMoveEven)
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
    if (!this.keepBarShow) {
      this.showBar = false
    }
     this.cancelBarWheel()
    }

    mainMousewheel (e:WheelEvent):void {
      if (!this.noStopPageScroll) {
        e.preventDefault()
      }
      this.cancelBarWheel()
      if (!this.showBar) {
        return
      }
      // 从静止开始启动
      const dom = e.currentTarget as HTMLDivElement
      const scrollMain = dom.firstElementChild! as HTMLDivElement
      const startH = parseInt(scrollMain.style.top || "0")
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

    locateBar (e:MouseEventEl<HTMLDivElement>) :void {
      let h = e.offsetY
      const dom = this.$refs.moveBar
      const maxH = this.scrollBoxH - this.moveBarH
       const factor = (this.scrollMainH - this.scrollBoxH) / maxH
      const scrollMain = dom.parentElement!.previousElementSibling! as HTMLDivElement
       h = h < 0 ? 0 : h > maxH ? maxH : h
       dom.style.top = h + "px"
       scrollMain.style.top = -h * factor + "px"
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
    top: 0;
    right: 0;
    width: $barW;
    padding: 6px ($barW - $barInnerW ) / 2;
    z-index: 100;
    background: none;
    cursor: pointer;

    &:hover {
      background: gray;
      box-shadow: 2px 1px 10px 4px rgba(136, 141, 148, 0.7);
    }
  }

  .m-scrollMain {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }

  .m-moveBar {
    width: $barInnerW;
    background: rgb(197, 208, 215);
    border-radius: $barInnerW;
    position: absolute;

    &:hover {
      background: white;
    }
  }
}
</style>
