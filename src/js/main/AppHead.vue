<template>
  <h2>{{ appName }}</h2>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

const HeadProps = Vue.extend({
  props: {
    appName: {
      type: String,
      default: "",
      required: true
    }
  }
})

@Component
export default class Head extends HeadProps {
}
</script>

<style>
.info {
  background: red;
}
</style>
