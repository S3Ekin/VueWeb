<template>
  <div>
    12
    <Test>
      <template v-slot:header="obj">
        <span>
          使用：{{ obj.obj.node.text }}
        </span>
      </template>
    </Test>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import Test from "./MySlots.vue"
@Component({
    name: "User",
    components: {
        Test
    }
})
export default class User extends Vue {

}
</script>

<style lang="scss">
.test {
  background: red;
}
</style>
