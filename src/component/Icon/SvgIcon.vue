<template functional>
  <svg
    class="icon svg-icon"
    :class="props.size"
    aria-hidden="true"
  >
    <use :xlink:href="'#'+props.className" />
  </svg>
</template>
<script lang="ts">
import Vue from "vue"
 import Component from "vue-class-component"
const props = Vue.extend({
    name: "SvgIcon",
    functional: true,
    props: {
        size: {
            type: String,
            default: ""
        },
        className: {
            type: String,
            required: true
        }
    }
})

@Component
export default class SvgIcon extends props {
}
</script>
<style lang="scss">
.icon {
  width: 16px;
  height: 16px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;

  &.middle {
    width: 24px;
    height: 24px;
  }
}
</style>
