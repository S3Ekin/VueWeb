<template>
  <div>
    <div>
      <div>
        <Button :handle="click">
          改变数据
        </Button>
        <Button :handle="click2">
          批量改变选择
        </Button>
        <Button :handle="click3">
          data
        </Button>
      </div>
    </div>
    <div
      class="flex-between"
      style="width: 50%;"
    >
      <ComboTree
        :data="node"
        field="test1"
        :width="200"
        id-field="code"
        :drop-width="300"
        :multiply="true"
        text-field="name"
        :init-combo-val="init"
        :able-clear="true"
        child-field="menuChildList"
      />
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
        <Button :handle="click4">
          改变数据
        </Button>
      </div>
      <SlideBox
        :slide="slide"
        :is-immedia="true"
      >
        <div style="height: 240px;">
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
import { comboMethods } from "@component/combo/Combobox"
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
}

export default Menu
</script>
<style lang="scss">
  .testBox {
    width: 300px;
    height: 300px;
  }
</style>
