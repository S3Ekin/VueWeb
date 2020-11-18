<template>
  <li>
    <div
      class="m-combo-item"
      :class="activeName"
      :data-index="index"
    >
      <span
        className="g-item-text"
        :style="levSpaceStyle"
      >
        <span>
          <template v-if="checkBox">
            <CheckBox
              :checked="checked"
              :has-checked="hasChecked"
              type="checkbox"
            >
              <SvgIcon
                :class-name="filedObj.itemIcon"
              />
              <slot
                :item-node="node"
              >
                <span class="combo-text">{{ text }}</span>
              </slot>
            </CheckBox>
          </template>
          <template v-else>
            <SvgIcon
              :class-name="filedObj.itemIcon"
            />
            <slot
              :item-node="node"
            >
              <span class="combo-text">{{ text }}</span>
            </slot>
          </template>
        </span>
      </span>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Inject, Prop } from "vue-property-decorator"
import { filedObj, node } from "../Combobox.d"
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
    @Prop(Object) node!: node<activeStatus>;
    @Prop(String) index!: string;
    @Prop(Boolean) checkBox!:boolean;
    @Prop(Number) lev?:number;
    @Inject() filedObj !:filedObj<"list">;

    get activeName ():string {
      const { node, checkBox } = this
      return checkBox ? "" : node.active === activeStatus.select ? "active" : ""
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
