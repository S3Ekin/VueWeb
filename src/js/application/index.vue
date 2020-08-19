<template>
  <div>
    <Button
      :handle="click"
    >
      按钮
    </Button>
    <Test />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Button from "../../component/button/index.vue"
import Test from "@component/test"
const app = Vue.extend({
})
@Component({
 components: {
        Button,
        Test
    }
})
class Application extends app {
    test = "23"
    click (e:MouseEvent):void {
        console.log(e)
    }
}

export default Application
</script>

<style lang="scss">
  .test {
    background: red;
  }
</style>
