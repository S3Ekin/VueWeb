<template>
  <div id="app">
    {{ message }}
  </div>
</template>

<script lang="ts">

type obj = {
    message: string;
    t:string;
    child: string;
};
export default {
    data: function ():obj {
        return {
            message: 'ee !aeeeeeeeee7',
            t: 'eeeee',
            child: "child"
        }
    }
}
</script>

<style>
  .test {
    font-size: 14px;
  }
</style>
