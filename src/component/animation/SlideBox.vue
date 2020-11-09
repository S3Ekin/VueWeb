<template>
  <div
    ref="dom"
    class="g-slideBox"
    :style="{display: firstSlide ? 'block' : 'none'}"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
@Component({
  name: "SlideBox"
})
export default class SlideBox extends Vue {
  @Prop({ default: "slide", type: String }) type!: "slide";
  @Prop(Boolean) isImmedia?: boolean;
  @Prop({ required: true, type: Boolean }) slide!: boolean;
  @Watch("slide")
  upSlide (): void {
   this.slideFn(this.slide)
  }

  timer = 0;
  arr: boolean[] = [];
  $refs!: {
    dom: HTMLDivElement;
  };

  firstSlide = this.slide

  get slideFn ():(slideDown:boolean)=>void {
      return this.isImmedia ? this.immediaFn : this.queue
  }

   queue ():void {
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
    let start = slideDown ? 0 : origin
    const step = origin / 60
    const fn = !slideDown
      ? () => {
          this.timer = window.setTimeout(() => {
            start -= step
            dom.style.height = start + "px"
            if (start > 0) {
              fn()
            } else {
              dom.style.display = "none"
              dom.style.height = ""
              this.timer = 0
              if (this.arr.length) {
                const newSlide = this.arr.shift()!
                this.queueFn(newSlide)
              }
            }
          }, 15)
        }
      : () => {
          this.timer = window.setTimeout(() => {
            start += step
            dom.style.height = start + "px"
            if (start < origin) {
              fn()
            } else {
              dom.style.height = ""
              this.timer = 0
              if (this.arr.length) {
                const newSlide = this.arr.shift()!
                this.queueFn(newSlide)
              }
            }
          }, 15)
        }
    fn()
  }

  immediaFn (slideDown: boolean): void {
    const dom = this.$refs.dom
    const hasRun = !!this.timer
    if (hasRun) {
      window.clearTimeout(this.timer)
      this.timer = 0
    }
    if (slideDown && !hasRun) {
        dom.style.display = "block"
        dom.style.height = "0px"
      }
      const child = dom.firstElementChild! as HTMLDivElement
      const origin = child.clientHeight
      let distance:number
      let start:number
    if (hasRun) {
        start = parseInt(dom.style.height)
        distance = slideDown ? origin - start : start
    } else {
     distance = origin
      start = slideDown ? 0 : origin
    }

     const step = distance / 60
      const fn = !slideDown
        ? () => {
            this.timer = window.setTimeout(() => {
              start -= step
              dom.style.height = start + "px"
              if (start > 0) {
                fn()
              } else {
                dom.style.display = "none"
                dom.style.height = ""
                this.timer = 0
              }
            }, 15)
          }
        : () => {
            this.timer = window.setTimeout(() => {
              start += step
              dom.style.height = start + "px"
              if (start < origin) {
                fn()
              } else {
                dom.style.height = ""
                this.timer = 0
              }
            }, 15)
          }
      fn()
  }
}
</script>
<style>
.g-slideBox {
  background: red;
  overflow: hidden;
  display: block;
}
</style>
