<template>
  <div class="test">
    <div>
      <Button :handle="click">
        test
      </Button>
    </div>
    <ComboList
      :data="data"
      field="test"
      default-val="1,4"
      :multiply="true"
      :able-clear="true"
      :bind-com-methods="bindMethod"
    />
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
    { id: 1, text: "er" },
    { id: 2, text: "er" },
    { id: 3, text: "er" },
    { id: 4, text: "er" },
    { id: 5, text: "er" },
    { id: 12, text: "eeee" }
  ]

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
  width: 400px;
  padding: 30px;
}
</style>
