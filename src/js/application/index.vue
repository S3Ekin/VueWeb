<template>
  <div>
    <Button
      :handle="click"
    >
      按钮
    </Button>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Button from "../../component/button/index.vue"
const app = Vue.extend({
})
@Component({
 components: {
        Button
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
