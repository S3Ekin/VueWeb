<template>
  <div
    v-show="true"
    class="g-loading"
  >
    <div class="m-loading">
      <b class="loading-text">Loading...</b>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"

@Component
 class Redirect extends Vue {
   mounted ():void {
    const redirect = this.$route.query.url as string
    this.$router.push(redirect)
   }
}
export default Redirect
</script>
