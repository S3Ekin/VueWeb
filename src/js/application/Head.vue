<template>
  <div class="page-head">
    <Search
      :handle="search"
      :width="400"
    >
      搜索
    </Search>
    <Button
      class-name="fa fa-add"
      @click="addInfo"
    >
      新增
    </Button>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import Search from "@component/search/index.vue"
import Button from "@component/button/index.vue"
import { modalOpt } from "./application"

@Component({
 components: {
        Search,
        Button
    }
})
class Application extends Vue {
    @Prop({ type: Function, required: true }) modalOpt!:modalOpt;
    search ():void {
      console.log(1)
    }

    addInfo ():void {
      this.modalOpt(-1, "showInfoModal", true)
    }
}

export default Application
</script>
