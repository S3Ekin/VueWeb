<template>
  <div>
    测试Slots
    <div>
      <slot
        name="header"
        :obj="obj"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
@Component({
    name: "Test"
})
export default class Test extends Vue {
 obj={
     name: "SEKin",
     node: {
       text: "er"
     }
 }
}
</script>

<style lang="scss">
.test {
  background: red;
}
</style>
