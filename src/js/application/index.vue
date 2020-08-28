<template>
  <div>
    <Button
      :handle="click"
    >
      按钮
    </Button>
    <Button
      :handle="loading"
    >
      按钮3
    </Button>
    <Button
      :handle="open"
    >
      按钮2
    </Button>
    <div>
      <Modal
        title="modal"
        field="showModal"
        :toggle-modal="modalOpt"
        :show="showModal"
      >
        <template v-slot:default="ty">
          {{ ty.slotProps }}
          sadf
        </template>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Button from "@component/button/index.vue"
import Modal from "@component/modal/index.vue"
import toastFn from "@component/Toast/index"
import loadFn from "@component/loading/index"
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

    showModal = false
    click (e:MouseEvent):void {
        console.log(e)
        this.showModal = true
        this.test += "sekin"
    }

    loading () :void {
      loadFn.open("ddd")
      setTimeout(function () {
        loadFn.close()
      }, 2000)
    }

    open ():void {
      toastFn.add("sdfasd")
      toastFn.add("sdfasd", "warn")
      toastFn.add("sdfasd", "error")
      toastFn.add("sdfasd", "success", true)
    }

    modalOpt (filed: "showModal", isOpen:boolean):void {
      this[filed] = isOpen
    }
}

export default Application
</script>

<style lang="scss">
  .test {
    background: red;
  }
</style>
