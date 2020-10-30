<template>
  <li class="combo-par-item">
    <div
      class="m-combo-item"
      :data-index="index"
      @click="toggleExpand"
    >
      <span
        class="g-item-text"
        :style="levSpaceStyle"
        @click="clickItemFn"
      >
        <span v-if=" filedObj.multiply">
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
      <span>
        <SvgIcon :class="slideIcon" />
      </span>
    </div>
    <div>
      <ul>
        <template
          v-for="(val, oindex) in child"
        >
          <ParTreeItem
            v-if="child.length"
            :key="val[filedObj.idField]"
            :node="val"
            :index="`${index},${oindex}`"
            :lev="lev"
            :click-fn="clickFn"
            :check-method="checkMethod"
            :check-for-par="checkForPar"
            :toggle-expand="toggleExpand"
          />
          <DropItem
            v-else
            :key="val[filedObj.idField]"
            :node="val"
            :index="`${index},${oindex}`"
            :lev="lev"
            :click-fn="clickFn"
            :check-method="checkMethod"
            :check-box="filedObj.multiply"
          />
        </template>
      </ul>
    </div>
  </li>
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Inject, Prop } from "vue-property-decorator"
import { SvgIcon } from "@component/Icon/index"
import { filedObj, node } from "../Combobox.d"
import { activeStatus } from "./util"

@Component({
    name: "TreePar",
    components: {
        SvgIcon
    }
})
export default class ParItem extends Vue {
    @Prop({ required: true, type: Object }) node!: node<activeStatus>;
    @Inject() filedObj!: filedObj<"tree">;
    @Prop({ required: true, type: String }) index!: string; // 节点索引
    @Prop({ required: true, type: Number }) lev!: number; // 树形节点的层级
    // formatterDropItem?: (node: IImmutalbeMap<any>) => React.ReactNode;
    @Prop({ required: true, type: Function }) toggleExpand!:(index:string) =>void;
    @Prop({ required: true, type: Function }) clickFn!:(index:string) =>void;
    @Prop({ required: true, type: Function }) checkForPar!:(val:string) =>void;
    @Prop({ required: true, type: Function }) checkMethod!:(val:string) =>void;

    get slideIcon ():string {
        return this.node.expand ? "arrow-bottom-line" : "arrow-top-line"
    }

    get child (): node<activeStatus>[] {
        const { node, filedObj: { childField } } = this
        return node[childField]
    }

    get activeName ():string {
      const { node } = this
      return node.active === activeStatus.select ? "active" : ""
    }

    get clickItemFn (): undefined | this["clickItem"] {
         const { filedObj: { multiply } } = this
         return multiply ? undefined : this.clickItem
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

    toggle ():void{
        console.log(12)
    }
}
</script>
