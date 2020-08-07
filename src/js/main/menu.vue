<template>
  <div>a</div>
</template>

<script lang="ts">
  import Vue from "vue"
  import Component from "vue-class-component"
  import { fetchApi } from "@api/postData"
  type menuItem = {
    // eslint-disable-next-line camelcase
    app_code: string;
    code: string;
    icon: string;
    menuChildList: string;
    name: string;
    rank: string;
    remark: string;
    sn: string;
    tag: string;
    url: string;
    version: string;
  }
  @Component
  export default class Menu extends Vue {
     menuData: menuItem[] | null= null;
     mounted ():void {
         fetchApi.get("power/getMyAllMenu", {
           userCode: "demo",
           appCode: "user"
         }).then(res => {
             console.log(res)
         })
     }
  }
</script>

<style>
  .menu {
    background: red;
  }
</style>
