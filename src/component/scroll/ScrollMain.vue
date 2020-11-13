<template>
  <div class="m-scrollMain">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"

@Component({
    name: "ScrollMain"
})
export default class ScrollMain extends Vue {
}
</script>
