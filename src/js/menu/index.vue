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
import Tree from "@component/combo/Tree.vue"
import { Component, Provide } from "vue-property-decorator"
import menuData from "./data"
const app = Vue.extend({
})
@Component({
 components: {
        Tree
    }
})
class Menu extends app {
    node = menuData.data
    filedObj = { id: "code", text: "name", child: "menuChildList" }
    @Provide("foo")
    foo="eeee"
}

export default Menu
</script>

<style lang="scss">
  .test {
    background: red;
  }
</style>
