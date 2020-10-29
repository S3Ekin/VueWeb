<template>
  <div class="test">
    <div>
      <Button :handle="click">
        test {{ test }}
      </Button>
    </div>
    <div class="flex-between">
      <ComboList
        :data="data"
        field="test1"
        :width="200"
        default-val="1,2"
        :multiply="true"
        :able-clear="true"
      /> <ComboList
        :data="data"
        field="test2"
        :width="200"
        default-val="3,4"
        :multiply="true"
        :able-clear="true"
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

  test:string

  constructor () {
    super()
    this.test = "er"
    console.log("constructor")
  }

  created ():void {
    console.log("crate")
  }

  comboMethods:comboMethods | null = null
  bindMethod (methods:comboMethods):void {
    this.comboMethods = methods
  }

  click ():void {
    const a = this.comboMethods!.getSelected()
    console.log(a)
    this.comboMethods!.click!("2")
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
