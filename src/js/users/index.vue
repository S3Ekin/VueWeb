<template>
  <div class="test">
    <ComboList
      :data="data"
      field="test"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import { ComboList } from "@component/combo/index"
@Component({
    name: "User",
    components: {
        ComboList
    }
})
export default class User extends Vue {
  data = [
    { id: 1, text: "er" },
    { id: 12, text: "eeee" }
  ]
}
</script>

<style lang="scss">
.test {
  border: 1px solid blue;
  height: 300px;
  width: 400px;
  padding: 30px;
}
</style>
