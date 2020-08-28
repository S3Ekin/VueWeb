<template>
  <div id="innerLoading">
    <div
      v-show="show"
      class="g-loading"
    >
      <div class="m-loading">
        <b class="loading-text">{{ loadTxt }}</b>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
const LoadingProps = Vue.extend({
    name: "Loading"
})
@Component
export default class Toast extends LoadingProps {
  show = false
  loadTxt = "Loading..."
  open (txt = "Loading..."):void{
    this.show = true
    this.loadTxt = txt
  }

  close ():void {
    this.show = false
  }
}
</script>

<style lang="scss">
@import "../../css/scss/variate";

.g-loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  //background: rgba(#000, .3);
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  &.hide-loading {
    display: none;
  }

  .m-loading {
    width: 100px;
    height: 100px;
    background: url("./assert/imgs/loading.svg") center no-repeat;
    line-height: 180px;
    text-align: center;
  }

  .loading-text {
    color: $text-color;
    letter-spacing: 0.1em;
  }
}
</style>
