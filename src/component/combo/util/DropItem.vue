<template>
  <li>
    <div
      class="m-combo-item"
      :class="activeName"
      :data-index="index"
      @click="clickItemFn"
    >
      <span
        className="g-item-text"
        :style="levSpaceStyle"
      >
        <span v-if="checkBox">
          <CheckBox
            :handle="checkFn"
            :checked="checked"
            :has-checked="hasChecked"
            :value="index"
          >
            <span class="combo-text">{{ text }}</span>
            <SvgIcon
              v-if="filedObj.itemIcon"
              :class-name="filedObj.itemIcon"
            />
          </CheckBox>
        </span>
        <span v-else>
          <SvgIcon
            v-if="filedObj.itemIcon"
            :class-name="filedObj.itemIcon"
          />
          <span class="combo-text">{{ text }}</span>
        </span>
      </span>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Inject, Prop } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { ISelected, filedObj } from "../Combobox.d"
import { SvgIcon } from "@component/Icon/index"
import { CheckBox } from "@component/checkbox/index"
import { activeStatus } from "./util"
@Component({
    name: "ComboxInp",
    components: {
        SvgIcon,
        CheckBox
    }
})
export default class ComboxInp extends Vue {
    @Prop(Object) node!: anyObj;
    @Prop(String) index!: string;
    @Prop(Boolean) multiply!:boolean;
    @Prop(Boolean) checkBox!:boolean;
    @Prop(Number) lev?:number;
    @Inject() filedObj !:filedObj<"list">;
    @Prop(Function) checkMethod!:(val: string)=>void;
    @Prop(Function) clickFn!:(index: string)=>void;
    @Prop() formatterDropItem?:(selected:ISelected[])=>VNode

    get activeName ():string {
        return ""
    }

     get clickItemFn (): undefined | this["clickItem"] {
         const { multiply, lev } = this
         return multiply && lev ? undefined : this.clickItem
    }

    get levSpaceStyle ():undefined | anyObj {
        const { lev } = this
        return lev !== undefined ? { paddingLeft: `${lev}em` } : undefined
    }

    get text ():string {
        const { node, filedObj } = this
        return node[filedObj.textField]
    }

    get checked ():boolean {
        const { node } = this
        return node.active === activeStatus.select
    }

    get hasChecked ():boolean {
        const { node } = this
        return node.active === activeStatus.hasSelect
    }

    checkFn (e: MouseEventEl<HTMLInputElement>):void {
        const dom = e.currentTarget!
        const value = dom.value!
        this.checkMethod(value)
    }

    clickItem (e: MouseEventEl<HTMLInputElement>):void {
        const dom = e.currentTarget!
        const index = dom.dataset.index!
        this.clickFn(index)
    }
}
</script>
