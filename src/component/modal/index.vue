<template>
  <Portal
    v-if="hasInit"
    :container="containerDom"
  >
    <div
      v-show="show"
      class="g-modal"
    >
      <div
        ref="modalDom"
        class="m-Mwrap"
        @mouseup="mouseUp"
      >
        <div class="m-Mask" />
        <div
          class="m-Modal"
          :class="className"
          data-point="0,0"
          :style="{width:width ? width+ 'px':null}"
        >
          <div class="m-Mtit">
            <span
              class="tit-name"
              @mousedown="headMouseDown"
            >{{ title }}</span>
            <span
              class="m-Mclose"
              @click="close"
            >
              <i class="fa fa-close" />
            </span>
          </div>
          <div
            class="m-Mbody"
            :style="{width: width ? width + 'px' : null}"
          >
            <slot
              name="default"
            />
            <slot name="foot">
              <div class="m-Mfooter">
                <Button
                  :handle="sure"
                >
                  确定
                </Button>
                <Button
                  border-type="line-btn"
                  :handle="close"
                >
                  关闭
                </Button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Portal>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Watch, Prop } from "vue-property-decorator"
import Portal from "./Portal"
import Button from "@component/button/index.vue"

@Component({
 name: "Modal",
    components: {
      Portal,
      Button
    }
})
export default class Modal extends Vue {
  $refs!:{
    modalDom: HTMLDivElement
  }

  @Prop({ type: String, default: "" }) className!: string;
  @Prop({ type: Function, required: true }) toggleModal!: (filed:string, show:boolean)=>void;
  @Prop({ required: true, type: Function }) sure!: (e:MouseEvent)=> void;
  @Prop({ type: String, required: true }) field!: string;
  @Prop(Number) width!: number;
  @Prop({ type: String, required: true }) title!: string;
  @Prop(Boolean) isOut!: boolean;
  @Prop(Boolean) show!: boolean;

  hasInit = false;

  get containerDom ():HTMLElement {
    if (this.isOut) {
      return document.getElementById("outModalRoot")!
    }
      return document.getElementById("innerModalRoot")!
  }

  @Watch("show")
  firstInit ():void{
    if (!this.hasInit) {
      this.hasInit = true
    }
  }

  close ():void {
   this.toggleModal(this.field, false)
  }

  mouseUp ():void{
        this.$refs.modalDom.onmousemove = null
  }

  headMouseDown (e: MouseEventEl<HTMLDivElement>):void {
      const modalDom = this.$refs.modalDom
      const childDom = modalDom.lastElementChild! as HTMLDivElement
      const pointArr = childDom.dataset.point!.split(",")
      const [pointX, pointY] = pointArr
      // 主要减去上一次移动留下的位置
      const diffPointX = e.clientX - +pointX
      const diffPointY = e.clientY - +pointY
      modalDom.onmousemove = (originE:MouseEvent) => {
            const x = originE.clientX - diffPointX
            const y = originE.clientY - diffPointY
           childDom.dataset.point = x + "," + y
           childDom.style.transform = `translate(${x}px,${y}px)`
      }
  }
}
</script>

<style lang="scss">

@import "../../css/scss/variate";
$M_width:400px;
$bg: $page-bg;
$padding: 40px;

.g-modal {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10;

  .m-Mask {
    background-color: rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
    position: absolute;
  }

  .m-Mwrap {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.m-Modal {
  z-index: 2;
  min-width: $M_width;
  color: $text-color;
  box-shadow: $shadow;
  border-radius: 4px;
  background-color: $bg;

  .m-Mtit {
    height: 48px;
    display: flex;
    position: relative;
    align-items: center;
    border-bottom: 2px solid $normal;
  }

  .tit-name {
    padding: 10px 20px;
    width: calc(100% - 56px);
    font-size: 18px;
    cursor: move;
  }

  .m-Mclose {
    color: $normal;
    position: absolute;
    right: $padding - 20;
    top: 14px;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }

  .m-Mbody {
    padding: 30px $padding;
    overflow: auto;

    .m-gridBox {
      background: white;
      border-radius: 4px;
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
    }
  }

  .m-Mfooter {
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;

    .s-btn {
      margin-right: 16px;

      &:last-child {
        margin-right: 0;
      }
    }

    .m-warn {
      left: 24px;
    }
  }

  .item-inp {
    margin: 12px 0;

    & > .item-inp {
      margin: 0;
    }
  }
}
</style>
