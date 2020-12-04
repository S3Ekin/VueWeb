<template>
  <div
    ref="dom"
    class="g-slideBox"
    :style="{ display: firstSlide ? 'block' : 'none' }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { Tween } from "./tween"
@Component({
  name: "SlideBox"
})
export default class SlideBox extends Vue {
  @Prop(Boolean) isImmedia?: boolean;
  @Prop({ required: true, type: Boolean }) slide!: boolean;
  @Prop(Boolean) directionUp?: boolean; // 下拉框在显示框上还是下
  @Watch("slide")
  upSlide (): void {
    this.slideFn(this.slide)
  }

  timer = 0;
  arr: boolean[] = [];
  $refs!: {
    dom: HTMLDivElement;
  };

  firstSlide = this.slide;

  get slideFn (): (slideDown: boolean) => void {
    return this.isImmedia ? this.immediaFn : this.queue
  }

  queue (): void {
    this.arr.push(this.slide)
    if (!this.timer) {
      // 启动函数
      const slide = this.arr.shift()!
      this.queueFn(slide)
    }
  }

  queueFn (slideDown: boolean): void {
    const dom = this.$refs.dom
    if (slideDown) {
      dom.style.display = "block"
      dom.style.height = "0px"
    }
    const child = dom.firstElementChild! as HTMLDivElement
    const origin = child.clientHeight

    const duration = 400
    let timeFrom = 0
    const timeEnd = Math.ceil(duration / 17)
    const dispaly = slideDown ? "block" : "none"
    const start = slideDown ? 0 : origin
    const end = !slideDown ? 0 : origin
    const direct = this.directionUp ? "top" : "bottom"
    child.style.position = "absolute"
    const originW = child.style.width
    child.style.width = "100%"
    child.style[direct] = "0"
    const fn = () => {
      this.timer = window.requestAnimationFrame(() => {
        const h = Tween.easeInOutSine(timeFrom, start, end, timeEnd)
        timeFrom++
        dom.style.height = h + "px"
        if (timeFrom < timeEnd) {
          fn()
        } else {
          dom.style.display = dispaly
          dom.style.height = ""
          this.timer = 0
          if (this.arr.length) {
            const newSlide = this.arr.shift()!
            this.queueFn(newSlide)
          }
          child.style.position = ""
          child.style[direct] = ""
          child.style.width = originW
        }
      })
    }
    fn()
  }

  immediaFn (slideDown: boolean): void {
    const dom = this.$refs.dom
    const hasRun = !!this.timer
    if (hasRun) {
      window.cancelAnimationFrame(this.timer)
      this.timer = 0
    }
    if (slideDown && !hasRun) {
      dom.style.display = "block"
      dom.style.height = "0px"
    }
    const child = dom.firstElementChild! as HTMLDivElement
    const origin = child.clientHeight
    // let distance: number
    let start: number

    const duration = 400
    let timeFrom = 0
    const timeEnd = Math.ceil(duration / 17)

    if (hasRun) {
      start = parseInt(dom.style.height)
      // distance = slideDown ? origin - start : start
    } else {
      // distance = origin
      start = slideDown ? 0 : origin
    }
    const end = !slideDown ? 0 : origin
    const dispaly = slideDown ? "block" : "none"
    const direct = this.directionUp ? "top" : "bottom"
    child.style.position = "absolute"
    child.style[direct] = "0"
    const fn = () => {
      this.timer = window.requestAnimationFrame(() => {
        const h = Tween.linear(timeFrom, start, end, timeEnd)
        timeFrom++
        dom.style.height = h + "px"
        if (timeFrom < timeEnd) {
          fn()
        } else {
          dom.style.height = ""
          dom.style.display = dispaly
          this.timer = 0
          child.style.position = ""
          child.style[direct] = ""
        }
      })
    }
    fn()
  }
}
</script>
<style>
.g-slideBox {
  overflow: hidden;
  display: block;
  position: relative;
}
</style>
