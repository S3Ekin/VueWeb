<template>
  <div>
    <p>menu</p>
    <Tree
      :node="node"
      :filed-obj="filedObj"
      path="0"
      :lev="0"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Tree from "@component/combo/Tree.vue"
import menuData from "./data"
const app = Vue.extend({
})
@Component({
 components: {
        Tree
    },
  provide: {
    foo: "barrtrtrt"
  }
})
class Menu extends app {
    node = menuData.data
    filedObj = { id: "code", text: "name", child: "menuChildList" }
}

export default Menu
</script>

<style lang="scss">
  .test {
    background: red;
  }
</style>
