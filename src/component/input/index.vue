<template>
  <div class="inp-item">
    <label
      :class="{'g-inp-lab': !vertical,'g-inp-vertical':vertical,'g-inp': !isTextArea,'g-txt': isTextArea}"
    >
      <span
        v-show="$slots"
        class="lab-tit"
      ><slot /></span>
      <input
        v-if="!isTextArea"
        class="s-inp"
        :name="name"
        :data-set="dataSet"
        :value="val"
        :class="[className,noFill]"
        :disabled="disabled"
        :style="{width: width ? width +'px':null}"
        @change="handle"
      >
      <textarea
        v-else
        class="s-txt"
        :rows="rows"
        :name="name"
        :data-set="dataSet"
        :value="val"
        :class="[className,noFill]"
        :disabled="disabled"
        :style="{width: width ? width +'px':null}"
        @change="handle"
      />
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
    import Vue from "vue"
    import { Component, Prop } from "vue-property-decorator"

    @Component({
        name: "SInp"
    })
    class SInp extends Vue {
       @Prop({ type: Function, required: true }) handle!: (e:MouseEvent)=>void;
       @Prop({ default: "text" }) type!: "text" | "number";
       @Prop(Number) width!: number;
       @Prop({ default: "normal" }) className!: "normal";
       @Prop({ default: "" }) name!: string;
       @Prop({ type: RegExp }) reg!: RegExp;
       @Prop({ default: "" }) val!: string;
       @Prop({ default: "" }) dataSet!: string;
       @Prop({ default: "" }) regTip!: string;
       @Prop({ default: 3 }) rows!: number;
       @Prop(Boolean) isTextArea!: boolean;
       @Prop(Boolean) noRequired!: boolean;
       @Prop(Boolean) disabled!: boolean;
       @Prop(Boolean) vertical!: boolean;

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
</style>
