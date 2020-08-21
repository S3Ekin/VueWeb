<template>
  <div class="inp-item">
    <label
      class="g-inp"
      :class="{'g-inp-lab': !vertical,'g-inp-vertical':vertical}"
    >
      <span
        v-show="$slots"
        class="lab-tit"
      ><slot /></span>
      <input
        class="s-inp"
        :name="name"
        :data-set="dataSet"
        :value="val"
        :class="[className,noFill]"
        :disabled="disabled"
        :style="{width: width ? width +'px':null}"
        @change="handle"
      >
      <span
        v-show="warnTxt"
        class="lab-tip-box"
      >
        {{ warnTxt }}
      </span>
    </label>
  </div>
</template>

<script lang="ts">
    import Vue, { PropType } from "vue"
    import Component from "vue-class-component"
    const InpProps = Vue.extend({
        name: "Button",
        props: {
            handle: {
                type: Function as PropType<(e:MouseEvent)=>void>,
                required: true
            },
            type: { // 边框样式
                type: String as PropType<"text" | "number" >,
                default: "text"
            },
            width: {
                type: Number,
                default: null
            },
            className: {
                type: String as PropType<"normal" >,
                default: "normal"
            },
            name: {
                type: String,
                default: ""
            },
            reg: {
                type: RegExp,
                default: null
            },
            val: {
                type: String,
                default: ""
            },
            dataSet: {
                type: String,
                default: ""
            },
            regTip: {
                type: String,
                default: ""
            },
            noRequired: Boolean,
            disabled: Boolean,
            vertical: Boolean
        }
    })

    @Component
    class SInp extends InpProps {
        warnTxt = ""
        get noFill ():string {
            if (this.reg) {
                const status = this.val.match(this.reg)
                this.warnTxt = !status ? this.regTip : ""
                return status ? "" : "no-fill"
            }
            if (!this.noRequired) {
                return !this.val ? "no-fill" : ""
            }
            return ""
        }

        change (e:MouseEventEl<HTMLInputElement>):void {
            this.handle(e)
        }
    }

    export default SInp

</script>

<style lang="scss">
@import "../../css/scss/variate";
$inp-h:36px;
$inp-border-color:#c6c9cf;
$active:#82bbf8;
$color:#5b5b5b;

.s-inp {
  height: $inp-h;
  text-indent: 0.5em;
  border: 0;
  outline: 0;
  color: $color;
}

.s-inp:disabled {
  background: $normal;
  opacity: 0.4;
  cursor: not-allowed;
}

.lab-tit {
  padding-right: 10px;
  font-size: 16px;
  color: $color;
}

.lab-tip-box {
  position: absolute;
  bottom: -22px;
  color: $error;
  font-size: 12px;
  padding: 4px 0;

  &::before {
    content: "*";
    font-size: 14px;
  }
}

.s-inp[disabled] {
  background: $btn-disabled;
  font-weight: bolder;
}

.s-txt {
  border-radius: 3px;
  line-height: 1.5em;
  padding: 4px;
  box-sizing: border-box;
  border: 1px solid $inp-border-color;
  color: $text-color;
  text-indent: 2em;
  resize: none;

  &:focus {
    border-color: $active;
  }

  &.block-txt {
    width: 100%;
    resize: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.g-txt {
  display: flex;
}

.s-slecte {
  border-radius: 4px;
  height: $inp-h;
  line-height: 1.5em;
  padding: 0 6px;
  box-sizing: border-box;
  background: none;
  color: $text-color;

  option {
    color: $text-color;
  }
}

.s-inp.normal {
  cursor: pointer;
  border: 1px solid;
  border-radius: 3px;
  border-color: $inp-border-color;
  background: none;

  &:focus {
    border-color: $active;
  }
}

.no-fill {
  &.s-inp {
    border-color: $error;
  }

  &.s-txt {
    border-color: $error;
  }
}

.upfile-box {
  display: flex;
  line-height: 36px;
  height: 36px;

  .file-name {
    border: 1px solid $normal;
    height: 100%;
    flex: 1;
    padding: 0 1em;
    word-break: break-all;
  }

  .upfile-inp {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }

  .j-btn {
    cursor: pointer;
    padding: 0 10px;
    background: #1182fb;
    color: white;
    text-align: center;
    position: relative;
    border-radius: 0 4px 4px 0;
  }
}

.g-check-item {
  display: flex;
  align-items: center;
}

%inpbox {
  height: $inp-h;
  display: flex;
  align-items: center;

  .m-label {
    margin: 0 6px;
  }
}

.m-label {
  display: inline-flex;
  align-items: center;
  margin-right: 30px;
  cursor: pointer;

  .wrap-icon {
    position: relative;
    padding-right: 8px;
  }

  .fa {
    color: $text-color;
    cursor: pointer;
    font-size: 18px;
    margin-right: 8px;
  }

  .fa-checked,
  .fa-radio {
    color: #1182fb;
  }

  .checkBox-inp {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    display: none;
  }

  &.active {
    color: #3b90f2;
  }
}

.disabled-box {
  cursor: not-allowed;
  color: #c6c9cf;

  .checkBox-inp {
    cursor: not-allowed;
  }

  .icon {
    cursor: not-allowed;
  }
}

.inp-item {
  margin: 20px 0;

  &:empty {
    margin: 0;
  }

  .g-inp-lab {
    display: flex;
    position: relative;

    &.g-inp {
      align-items: center;
    }
  }

  .g-inp-vertical {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;

    .lab-tit {
      margin-bottom: 10px;
    }

    .s-inp,
    .s-txt {
      width: 100%;
    }
  }
}

/* radio */
.m-radio {
  @extend %inpbox;
}

.m-checkbox {
  @extend %inpbox;
}

.file-inp {
  position: absolute;
  left: 0;
  opacity: 0;
}
//search
.m-search {
  display: flex;
  justify-content: space-between;

  .input-box {
    flex: 1;
    position: relative;

    .s-inp {
      width: 100%;
      height: 32px;
    }
  }

  .s-btn {
    height: 32px;
    width: 66px;
    min-width: 66px;
    padding: 0;
    margin-left: 1em;
  }

  .search-close {
    padding: 4px;
    cursor: pointer;
    position: absolute;
    right: 6px;
    top: 4px;
    display: none;

    &:hover {
      color: $error;
    }
  }

  &.active-search {
    .search-close {
      display: block;
    }
  }
}

.g-SCombo {
  position: relative;
  cursor: pointer;

  .m-combo-inp {
    border: 1px solid $inp-border-color;
    height: $inp-h - 6px;
    display: flex;
    justify-content: space-evenly;
    padding: 0 14px 0 10px;
    align-items: center;
  }

  .m-combo-val {
    flex: 1;
  }

  .m-combo-pannel {
    position: absolute;
    background: white;
    box-shadow: $shadow;
    width: 100%;
    max-height: 400px;
    z-index: 10;
    text-align: left;
    padding: 16px 4px;
    border-radius: 4px;
  }

  .drop-item {
    padding: 6px 10px;

    &.selected {
      background: rgba(24, 144, 255, 0.17);
      color: $active;
    }
  }

  &.active {
    .m-combo-inp {
      border-color: $active;
    }
  }
}

@mixin inp-placeholder {
  color: #aab2bd;
  font-size: 12px;
  text-align: left;
}
// // 不能使用css规则 a,b{}
// input::-webkit-input-placeholder {
//   @include inp-placeholder;
// }

// input:-moz-placeholder {
//   @include inp-placeholder;
// }

// input::-moz-placeholder {
//   @include inp-placeholder;
// }

// input::-ms-input-placeholder {
//   @include inp-placeholder;
// }

</style>
