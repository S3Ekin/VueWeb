<template>
  <div class="flex-between">
    <ComboTree
      :data="node"
      field="test1"
      :width="200"
      id-field="code"
      text-field="name"
      child-field="menuChildList"
    />
    <ComboTree
      :data="node"
      field="test2"
      :width="200"
      id-field="code"
      text-field="name"
      child-field="menuChildList"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { ComboTree } from "@component/combo/index"
import { Component } from "vue-property-decorator"
import menuData from "./data"
const app = Vue.extend({
})
@Component({
  name: "Menu",
 components: {
        ComboTree
    }
})
class Menu extends app {
    node = menuData.data.menuChildList
}

export default Menu
</script>
