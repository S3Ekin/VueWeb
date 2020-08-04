<template>
  <div id="app">
    <p class="test">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts">
import "./css/common.scss"
type obj = {
    message: string;
    t:string;
    child: string;
};
export default {
    data: function ():obj {
        return {
            message: 'ee !aeee7',
            t: 'eeeee',
            child: "child"
        }
    }
}
</script>

<style lang="scss">
  .test {
    color: red;
  }
</style>
