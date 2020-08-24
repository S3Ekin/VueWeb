<template>
  <button
    class="s-btn"
    :class="[className,borderType,colorType,sizeName]"
    @click="handle"
    @mouseup="keyUp"
  >
    <slot />
  </button>
</template>

<script lang="ts">
    import Vue, { PropType } from "vue"
    import Component from "vue-class-component"
    const BtnProps = Vue.extend({
        name: "Button",
        props: {
            handle: {
                type: Function as PropType<(e:MouseEvent)=>void>,
                required: true
            },
            borderType: { // 边框样式
                type: String as PropType<"normal-btn" | "dashed-btn" | "line-btn">,
                default: "normal-btn"
            },
            colorType: { // 颜色
                type: String as PropType<"danger" | "primary" | "green" | "yellow">,
                default: "primary"
            },
            size: {
                type: String as PropType<"big" | "small">,
                default: ""
            },
            className: {
                type: String,
                default: ""
            },
            name: {
                type: String,
                default: ""
            },
            val: {
                type: String,
                default: ""
            }, // button 里的value
            dataSet: {
                type: String,
                default: ""
            },
            noAnimate: Boolean,
            disabled: Boolean
        }
    })

    @Component
    class Button extends BtnProps {
      timeId = 0

    get sizeName ():string {
      return this.size ? "btn-" + this.size : ""
    }

    keyUp (e: MouseEventEl<HTMLButtonElement>):void {
        if (this.noAnimate) {
          return
        }
        const target = e.currentTarget!
        const timeId = this.timeId
        if (timeId) {
          window.clearTimeout(timeId)
        }
        target.classList.add("btn-clicked")
        const newTimeid = window.setTimeout(function () {
          target.classList.remove("btn-clicked")
        }, 400)
          this.timeId = newTimeid
      }
    }

    export default Button

</script>

<style lang="scss">
/**
* normal-btn:有背景的按钮 ，line-btn:线框按钮，dashed-btn：虚线按钮
* danger:颜色为红,primary：主题颜色，green：绿颜色
*/
@import "../../css/scss/variate";
$primary:#04a9f5;
$green:green;
$yellow:#e4d619;

.s-btn {
  display: inline-block;
  outline: none;
  padding: 0 1em;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius: 4px;
  height: 2em;

  &:disabled {
    background: darken($btn-disabled, 40%) !important;
    opacity: 0.6;
    cursor: not-allowed;
    border: none;
    color: white !important;
  }

  &.btn-big {
    min-width: 100px;
  }

  &.has-icon {
    padding-right: 0.5em;
  }
}
//按钮点击时的状态，用于点击时加类名
.btn-clicked {
  $leg:-1px;

  &::after {
    content: "";
    position: absolute;
    top: $leg;
    left: $leg;
    right: $leg;
    bottom: $leg;
    opacity: 0.4;
    border-radius: inherit;
    border: 0 solid $text-theme-color;
    animation: buttonEffect 0.4s;
  }
}

//有背景的按钮
.normal-btn {
  border: none;
  color: $text-bg-color;

  &:hover {
    color: $text-bg-color;
  }

  $colorMap:(
    primary:$primary,
    danger:$error ,
    green:$green ,
    yellow:$yellow
  );

  @each $key,$val in $colorMap {
    &.#{$key} {
      background: $val;

      &:hover {
        background: lighten($val, 15%);
      }
    }
  }
}

//线框按钮
.line-btn {
  border: 2px solid;
  background: none;

  $colorMap:(
    primary:$primary,
    danger:$error ,
    green:$green ,
    yellow:$yellow
  );

  @each $key,$val in $colorMap {
    &.#{$key} {
      color: $val;
      border-color: $val;

      &:hover {
        border-color: lighten($val, 15%);
      }
    }
  }
}

//虚线按钮
.dashed-btn {
  border: 2px dashed;
  background: none;

  $colorMap:(
    primary:$primary,
    danger:$error ,
    green:$green ,
    yellow:$yellow
  );

  @each $key,$val in $colorMap {
    &.#{$key} {
      color: $val;
      border-color: $val;

      &:hover {
        border-color: lighten($val, 15%);
      }
    }
  }
}

@keyframes buttonEffect {
  $width:8px;

  to {
    opacity: 0;
    top: -$width;
    left: -$width;
    bottom: -$width;
    right: -$width;
    border-width: $width;
  }
}

/* 按钮组 */
.m-optBtn {
  display: flex;
  align-items: center;

  .s-btn {
    margin-right: 1em;

    &:last-child {
      margin-right: 0;
    }
  }
}
//下拉按钮组
.g-group-btns {
  position: relative;
  z-index: 3;

  .drop-theme {
    .icon {
      padding-left: 8px;
    }
  }

  .wrap-drop {
    display: none;
    position: absolute;
    padding-top: 10px;
    white-space: nowrap;
    min-width: 100%;
  }

  .drop-group {
    border-radius: 4px;
    background: $page-bg;
    box-shadow: $shadow;
    padding: 8px;
  }

  .drop-item {
    padding: 5px;
    border-bottom: 2px solid $normal;
    text-align: center;

    .icon {
      padding-right: 8px;
    }

    &:last-child {
      border: none;
    }

    cursor: pointer;

    &:hover {
      color: $theme-color;
    }
  }

  &:hover {
    .wrap-drop {
      display: block;
    }
  }
}
</style>
