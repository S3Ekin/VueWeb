<template>
  <div class="test">
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
    <div class="flex-between">
      <ComboList
        :data="data"
        field="test1"
        :width="200"
        default-val="1,2"
        :able-clear="true"
      /> <ComboList
        :data="data"
        field="test2"
        :width="200"
        default-val="3,4"
        :multiply="true"
        :direction-up="true"
        :able-clear="true"
        :init-combo-val="init"
      /> <ComboList
        :data="data"
        field="test3"
        :width="200"
        default-val="1,5"
        :multiply="true"
        :able-clear="true"
        :bind-com-methods="bindMethod"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import { ComboList } from "@component/combo/index"
import Button from "@component/button/index.vue"
import { comboMethods } from "@component/combo/Combobox"
@Component({
    name: "User",
    components: {
        ComboList,
        Button
    }
})
export default class User extends Vue {
  data = [
    { id: 1, text: "er1" },
    { id: 2, text: "er2" },
    { id: 3, text: "er3" },
    { id: 4, text: "er4" },
    { id: 5, text: "er5" },
    { id: 12, text: "eeee6" }
  ]

  list:anyObj[] = []

  init: {id:string} | null = null;

  comboMethods:comboMethods | null = null
  bindMethod (methods:comboMethods):void {
    this.comboMethods = methods
  }

  click ():void {
    this.data = [
      { id: 1, text: "w" },
      { id: 2, text: "w2" },
      { id: 3, text: "w3" },
      { id: 4, text: "w4" },
      { id: 5, text: "w5" },
      { id: 12, text: "w6" }
    ]

    this.list = [
    {
      id: 1,
      text: "er1",
      toggle: false,
      child: [
          { id: 12, text: "er12", toggle: false },
          { id: 13, text: "er13", toggle: true }
      ]
    },
    {
    id: 2,
    text: "er2",
    toggle: false,
    child: [
          { id: 22, text: "er22", toggle: false },
          { id: 23, text: "er23", toggle: true }
      ]
    },
    {
    id: 3,
    text: "er3",
    toggle: true,
    child: [
          { id: 32, text: "er32", toggle: false },
          { id: 33, text: "er33", toggle: true }
      ]
    }
  ]
  }

  click2 ():void {
  this.init = {
    id: "1,2,3,4"
  }
  }

  click3 ():void {
    this.list[0].toggle = true
    this.list[0].child[0].toggle = true
  }
}
</script>

<style lang="scss">
.test {
  border: 1px solid blue;
  height: 300px;
  padding: 30px;
}
</style>
