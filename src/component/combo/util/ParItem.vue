<template>
  <li class="combo-par-item">
    <div
      class="m-combo-item"
      :data-index="index"
    >
      <span
        class="g-item-text"
        :style="levSpaceStyle"
      >
        <span>
          <template v-if="filedObj.multiply">
            <CheckBox
              :checked="checked"
              :has-checked="hasChecked"
              type="checkbox"
            >
              <SvgIcon
                :class-name="expandIcon"
              />
              <slot
                name="item"
                :item-node="node"
              >
                <span class="combo-text">{{ text }}</span>
              </slot>
            </CheckBox>
          </template>
          <template v-else>
            <SvgIcon
              :class-name="expandIcon"
            />
            <slot
              :item-node="node"
              name="item"
            >
              <span class="combo-text">{{ text }}</span>
            </slot>
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
          >
            <template v-slot:item="{itemNode}">
              <slot
                name="item"
                :item-node="itemNode"
              />
            </template>
          </ParItem>
          <DropItem
            v-else
            :key="val[filedObj.idField]"
            :node="val"
            :index="`${index},${oindex}`"
            :lev="lev + 1"
            :check-box="filedObj.multiply"
          >
            <template v-slot="{itemNode}">
              <slot
                name="item"
                :item-node="itemNode"
              />
            </template>
          </DropItem>
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
}
</script>
