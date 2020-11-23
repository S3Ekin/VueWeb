<template>
  <div>
    <div>
      <div>
        <Button @click="click">
          改变数据
        </Button>
        <Button @click="click2">
          批量改变选择
        </Button>
        <Button @click="click3">
          data
        </Button>
      </div>
    </div>
    <div
      class="flex-between"
      style="width: 90%;"
    >
      <ComboTree
        :data="node"
        field="test1"
        :direction-up="false"
        :width="400"
        id-field="code"
        :drop-width="300"
        :multiply="true"
        text-field="name"
        :click-callback="clickCallback"
        :init-combo-val="init"
        :able-clear="true"
        child-field="menuChildList"
      >
        <template v-slot:inp="{selected}">
          <span
            v-for="val in selected"
            :key="val.id"
          >
            <b style="color: red;">{{ val.text }}，</b>
          </span>
        </template>
        <template v-slot:item="{itemNode}">
          <span>
            {{ itemNode.name }} + "自定义"
          </span>
        </template>
      </ComboTree>
      <ComboTree
        :data="node"
        field="test2"
        :width="200"
        id-field="code"
        text-field="name"
        child-field="menuChildList"
        :bind-com-methods="bindMethod"
      />
    </div>
    <div
      style="padding: 15px;"
      class="testBox"
    >
      <div>
        <Button @click="click4">
          改变数据
        </Button>
      </div>
      <SlideBox
        :slide="slide"
        :is-immedia="true"
      >
        <div style="height: 240px; border: 1px solid;">
          123123
        </div>
      </SlideBox>
    </div>
    <div
      style="padding: 15px;"
      class="testBox"
    >
      <div>
        <Button @click="click5">
          改变数据
        </Button>
      </div>
      <SlideBox
        :slide="slide1"
      >
        <div style="height: 240px; border: 1px solid;">
          123123
        </div>
      </SlideBox>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { ComboTree } from "@component/combo/index"
import { Component } from "vue-property-decorator"
import { comboMethods, ISelected } from "@component/combo/Combobox"
import Button from "@component/button/index.vue"
import { SlideBox } from "@component/animation/index"
import menuData from "./data"
const app = Vue.extend({})
@Component({
  name: "Menu",
  components: {
    Button,
    SlideBox,
    ComboTree
  }
})
class Menu extends app {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any = menuData.data.menuChildList;
  comboMethods: comboMethods | null = null;
  bindMethod (methods: comboMethods): void {
    this.comboMethods = methods
  }

  init = {};
  slide = false
  slide1 = true
  clickCallback (selected: ISelected[], field: string, node?:anyObj):void {
    console.log(selected)
    console.log(field)
    console.log(node)
  }

  click (): void {
    this.node = [
      {
        code: "1",
        name: "er1",
        toggle: false,
        menuChildList: [
          { code: 12, name: "er12", toggle: false },
          { code: 13, name: "er13", toggle: true }
        ]
      },
      {
        code: "2",
        name: "er2",
        toggle: false,
        menuChildList: [
          { code: 22, name: "er22", toggle: false },
          { code: 23, name: "er23", toggle: true }
        ]
      },
      {
        code: 3,
        name: "er3",
        toggle: true,
        menuChildList: [
          { code: 32, name: "er32", toggle: false },
          { code: 33, name: "er33", toggle: true }
        ]
      }
    ]
  }

  click2 (): void {
    this.init = {
      id: "kpi_0101,kpi_0201"
    }
  }

  click3 (): void {
    this.comboMethods && this.comboMethods.click!("kpi_0101")
  }

  click4 (): void {
    this.slide = !this.slide
  }

  click5 (): void {
    this.slide1 = !this.slide1
  }
}

export default Menu
</script>
<style lang="scss">
  .testBox {
    width: 300px;
    height: 300px;
  }
</style>
