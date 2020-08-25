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
        <div ref="dom">
          我是模态框
          {{ test }}
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
    $refs!:{
      dom:HTMLDivElement
    }

    mounted ():void{
      console.log(this.$refs.dom)
    }

    click (e:MouseEvent):void {
        console.log(e)
        this.test += "sekin"
    }
}

export default Application
</script>

<style lang="scss">
  .test {
    background: red;
  }
</style>
