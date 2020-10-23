<template functional>
  <svg
    class="icon svg-icon"
    :class="size"
    aria-hidden="true"
  >
    <use :xlink:href="'#'+className" />
  </svg>
</template>
<script lang="ts">
import Vue from "vue"
 import { Component, Prop } from "vue-property-decorator"

@Component({
    name: "SvgIcon"
})
export default class SvgIcon extends Vue {
  @Prop(String) size!: string;
  @Prop({ type: String, required: true }) className!: string;
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
