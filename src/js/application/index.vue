<template>
  <div>
    <Button
      :handle="click"
    >
      按钮
    </Button>
    <div>
      <Modal
        title="modal"
      >
        <div>
          我是模态框
        </div>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Button from "@component/button/index.vue"
import Modal from "@component/modal/index.vue"
const app = Vue.extend({
})
@Component({
 components: {
        Button,
        Modal
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
