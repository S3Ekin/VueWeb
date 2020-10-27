<template>
  <div
    class="m-combo-inp"
    :class="className"
    @click="slideFn"
  >
    <div className="combo-value">
      <span v-if="selected.length">
        {{ formatterVal(selected) }}
      </span>
      <span
        v-else
        class="combo-inp-tit"
      >
        {{ tit }}
      </span>
    </div>
    <SvgIcon
      v-if="!noicon"
      :class-name="'fa fa-' +slideIcon "
    />
    <span
      v-if="clearIcon"
      @click="clickFn"
    >
      <SvgIcon class-name="fa fa-close" />
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { ISelected } from "../Combobox.d"
import { SvgIcon } from "@component/Icon/index"

const defaultVal = (seleted:ISelected[]) => {
            return seleted.map(val => val.text).join("，")
        }
@Component({
    name: "ComboxInp",
    components: {
      SvgIcon
    }
})
export default class ComboxInp extends Vue {
    @Prop(String) tit!: string;
    @Prop(Array) selected!: ISelected[];
    @Prop(Boolean) drop!:boolean;
    @Prop(Boolean) noicon?:boolean;
    @Prop(Boolean) noRequire?:boolean;
    @Prop(Boolean) ableClear?:boolean;
    @Prop(Function) slideFn!:()=>void;
    @Prop(Function) clearFn!:()=>void;
    @Prop({ type: Function, default: defaultVal }) formatterVal!:(selected:ISelected[])=>VNode

    get clearIcon ():boolean {
        const { ableClear, selected } = this
        return !!(ableClear && selected.length)
    }

    get className ():string {
        const { noRequire, selected } = this
        return noRequire ? "" : selected.length ? "" : "no-fill"
    }

    get slideIcon ():string {
        return this.drop ? "down" : "up"
    }

    clickFn (e: MouseEventEl<HTMLSpanElement>): void {
        e.stopPropagation()
        this.clearFn()
    }
}
</script>
<style lang="scss">

@import "../../../css/scss/variate";
$combo-bg:$page-bg;
$combo-text-color:$text-color;
$combo-h:2em;
$combo-drop-padding:8px;

.m-combo-inp {
  .combo-value {
    flex: 1;
    word-break: break-all;
    overflow: auto;
    height: 100%;
    padding-top: 0.3em;
    box-sizing: border-box;
    pointer-events: none;
  }

  .combo-inp-tit {
    color: rgba($combo-text-color, 0.2);
    font-size: 15px;
  }

  &.autoHInp {
    height: auto;
    min-height: $combo-h;
  }

  .j-slide {
    padding: 0 8px;
    cursor: pointer;
  }

  &.no-fill {
    border-color: $error;
  }
}

.m-drop {
  .drop-ul {
    overflow: auto;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .combo-text {
    padding-left: 4px;
  }

  .m-combo-item {
    padding: $combo-drop-padding;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    &:hover {
      color: lighten($combo-text-color, 20%);
      background: #e6f7ff;
    }
  }

  &.direction-up {
    bottom: 44px;
  }

  &.direction-down {
    margin-top: 10px;
  }

  .m-combo-item.active {
    background-color: #bfe6f9;
    border-radius: 2px;
    color: #04a9f5;

    &:hover {
      color: #04a9f5;
    }
  }
}

.g-combo {
  position: relative;

  .m-combo-inp {
    position: relative;
    color: $combo-text-color;
    display: flex;
    height: $combo-h;
    cursor: pointer;
    border: 1px solid $border-color;
    border-radius: 4px;
    align-items: center;
    background-color: $combo-bg;
    padding: 0 4px;
  }

  .m-drop {
    color: $combo-text-color;
    margin-top: 8px;
    background: $combo-bg;
    position: absolute;
    box-sizing: content-box;
    width: 100%;
    box-shadow: $shadow;
    border-radius: 4px;
    z-index: 10;
    overflow: hidden;
    transition: height 0.6s ease-in-out;
  }

  .no-fill {
    &.m-combo-inp {
      border-color: $error;
    }
  }

  .m-label {
    margin-right: 0;
  }

  .fa {
    color: $theme-color;
  }
}
</style>
