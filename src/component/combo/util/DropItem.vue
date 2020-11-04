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
            :checked="checked"
            :has-checked="hasChecked"
            :name="filedObj.field"
            :value="index"
            type="checkbox"
            :handle="checkFn"
          >
            <SvgIcon
              :class-name="filedObj.itemIcon"
            />
            <span class="combo-text">{{ text }}</span>
          </CheckBox>
        </span>
        <span v-else>
          <SvgIcon
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
import { ISelected, filedObj, node } from "../Combobox.d"
import { SvgIcon } from "@component/Icon/index"
import { CheckBox } from "@component/checkbox/index"
import { activeStatus } from "./util"
// eslint-disable-next-line @typescript-eslint/no-empty-function
const empty = () => {}
@Component({
    name: "ComboxInp",
    components: {
        SvgIcon,
        CheckBox
    }
})
export default class ComboxInp extends Vue {
    @Prop(Object) node!: node<activeStatus>;
    @Prop(String) index!: string;
    @Prop(Boolean) checkBox!:boolean;
    @Prop(Number) lev?:number;
    @Inject() filedObj !:filedObj<"list">;
    @Prop(Function) checkMethod!:(val: string)=>void;
    @Prop({ type: Function, required: true }) clickFn!:(index: string)=>void;
    @Prop() formatterDropItem?:(selected:ISelected[])=>VNode

    get activeName ():string {
      const { node, checkBox } = this
      return checkBox ? "" : node.active === activeStatus.select ? "active" : ""
    }

    get clickItemFn (): this["clickItem"] {
         const { checkBox } = this
         return checkBox ? empty : this.clickItem
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
