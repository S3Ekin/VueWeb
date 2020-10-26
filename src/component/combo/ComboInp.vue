<template>
  <div
    className="m-combo-inp"
    :class="className"
    @change="slideFn"
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
import { ISelected } from "./Combobox"

const defaultVal = (seleted:ISelected[]) => {
            return seleted.map(val => val.text).join("，")
        }
@Component({
    name: "ComboxInp"
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
