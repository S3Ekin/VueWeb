<template>
  <li class="combo-par-item">
    <div
      class="m-combo-item"
      :data-index="index"
      @click="toggleSlide"
    >
      <span
        class="g-item-text"
        :style="levSpaceStyle"
      >
        <span>
          <template v-if="filedObj.multiply">
            <CheckBox
              :handle="checkParEvent"
              :checked="checked"
              :has-checked="hasChecked"
              :value="index"
              :name="filedObj.field"
              type="checkbox"
            >
              <SvgIcon
                :class-name="expandIcon"
              />
              <span class="combo-text">{{ text }}</span>
            </CheckBox>
          </template>
          <template v-else>
            <SvgIcon
              :class-name="expandIcon"
            />
            <span class="combo-text">{{ text }}</span>
          </template>
        </span>
      </span>
      <span>
        <SvgIcon :class-name="slideIcon" />
      </span>
    </div>
    <SlideBox
      :is-immedia="false"
      :slide="node.expand"
    >
      <ul>
        <template
          v-for="(val, oindex) in child"
        >
          <ParItem
            v-if="val[filedObj.childField].length"
            :key="val[filedObj.idField]"
            :node="val"
            :index="`${index},${oindex}`"
            :lev="lev + 1"
            :click-fn="clickFn"
            :check-method="checkMethod"
            :check-par="checkPar"
            :toggle-expand="toggleExpand"
          />
          <DropItem
            v-else
            :key="val[filedObj.idField]"
            :node="val"
            :index="`${index},${oindex}`"
            :lev="lev + 1"
            :click-fn="clickFn"
            :check-method="checkMethod"
            :check-box="filedObj.multiply"
          />
        </template>
      </ul>
    </SlideBox>
  </li>
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Inject, Prop } from "vue-property-decorator"
import { SvgIcon } from "@component/Icon/index"
import { filedObj, node } from "../Combobox.d"
import { activeStatus } from "./util"
import { CheckBox } from "@component/checkbox/index"
import { SlideBox } from "@component/animation/index"
import DropItem from "./DropItem.vue"

@Component({
    name: "ParItem",
    components: {
        SvgIcon,
        DropItem,
        CheckBox,
        SlideBox
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
    @Prop({ required: true, type: Function }) checkPar!:(val:string) =>void;
    @Prop({ required: true, type: Function }) checkMethod!:(val:string) =>void;

    get slideIcon ():string {
        return this.node.expand ? "fa-arrow-bottom-line" : "fa-arrow-top-line"
    }

    get expandIcon ():string {
        return this.node.expand ? 'fa-bg-open-folder' : 'fa-folder'
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

    toggleSlide (e:MouseEventEl<HTMLInputElement>):void {
      const index = e.currentTarget!.dataset.index!
      this.toggleExpand(index)
    }

    checkFn (e: MouseEventEl<HTMLInputElement>):void {
        const dom = e.currentTarget!
        const value = dom.value!
        this.checkMethod(value)
    }

    checkParEvent (e: MouseEventEl<HTMLInputElement>):void {
        const dom = e.currentTarget!
        const value = dom.value!
        this.checkPar(value)
    }

    clickItem (e: MouseEventEl<HTMLInputElement>):void {
        const dom = e.currentTarget!
        const index = dom.parentElement!.dataset.index!
        this.clickFn(index)
    }
}
</script>
