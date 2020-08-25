<template functional>
  <svg
    className="{`icon"
    ${size}`}
    aria-hidden="true"
  >
    <use xlinkHref="{`#icon${className}`}" />
  </svg>
</template>

<script>
export default {

}
</script>

<style>
.icon {
  width: 16px;
  height: 16px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
