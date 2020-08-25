<template>
  <Portal
    :container="containerDom"
  >
    <div
      ref="modalDom"
      class="m-Mwrap"
      @mouseup="mouseUp"
    >
      <div class="m-Mask" />
      <div
        class="m-Modal"
        :data-set="position.pointY"
        :data-name="test"
        :style="{transform:`translate(${position.pointX}px, ${position.pointY}px)`}"
      >
        <div class="m-Mtit">
          <span
            class="tit-name"
            @mousedown="headMouseDown"
          >{{ title }}</span>
          <span class="m-Mclose">
            <i class="fa fa-close" />
          </span>
        </div>

        <div
          class="m-Mbody"
          :style="{width: width ? width + 'px' : null}"
        >
          <input
            v-model="test"
            type="text"
          >
          <span>{{ test }}</span>
          <slot />
        </div>
      </div>
    </div>
  </Portal>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Portal from "./Portal"
const ModalProps = Vue.extend({
    name: "Modal",
    components: {
      Portal
    },
    props: {
            className: {
                type: String,
                default: ""
            },
            field: {
                type: String,
                default: ""
            },
            width: {
                type: Number,
                default: null
            },
            title: {
              type: String,
              required: true
            },
            isOut: Boolean,
            show: Boolean
    }
})
@Component
export default class Modal extends ModalProps {
  $refs!:{
    modalDom: HTMLDivElement
  }

  test = 0

  position = {
    pointX: 50,
    pointY: 0
  }

  get containerDom ():HTMLElement {
    if (this.isOut) {
      return document.getElementById("outModalRoot")!
    }
      return document.getElementById("innerModalRoot")!
  }

  mouseUp ():void{
        this.$refs.modalDom.onmousemove = null
          console.log(this.position.pointY, "this")
  }

  updated (old:string, newOld:string):void{
    console.log("updata", old, newOld)
  }

  headMouseDown (e: MouseEventEl<HTMLDivElement>):void {
      const modalDom = this.$refs.modalDom
      const { pointY, pointX } = this.position
      // 主要减去上一次移动留下的位置
      const diffPointX = e.clientX - pointX
      const diffPointY = e.clientY - pointY
      console.log(diffPointX)
      modalDom.onmousemove = (originE:MouseEvent) => {
        console.log(1)
            this.position.pointX = originE.clientX - diffPointX
            this.position.pointY = originE.clientY - diffPointY
          console.log(this.position.pointY)
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
  }
}

.m-Modal {
  z-index: 2;
  min-width: $M_width;
  color: $text-color;
  box-shadow: $shadow;
  border-radius: 4px;
  background-color: $bg;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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
    padding: $padding;
    padding-top: 30px;
    overflow: auto;

    .m-gridBox {
      background: white;
      border-radius: 4px;
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
    }
  }

  .m-Mfooter {
    display: flex;
    justify-content: center;
    padding: $padding;
    padding-top: 0;

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

.g-confirm {
  .m-Mfooter {
    display: flex;
    justify-content: flex-end;

    .s-btn {
      margin-right: 5px;
    }
  }

  .del-body {
    display: flex;
  }

  .del-txt {
    font-size: 16px;
    line-height: 40px;
    word-break: break-all;
  }

  .del-tip {
    $color:#aaaeb3;

    color: $color;
    font-size: 12px;
    position: relative;

    &::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: $color;
    }
  }

  .del-icon {
    margin-right: 16px;

    .fa {
      font-size: 50px;
      color: $error;
    }
  }
}
</style>
