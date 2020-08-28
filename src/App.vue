<template>
  <div id="app">
    <aside
      :class="{active:menuSlide,}"
      class="left-aside"
      :style="{width:`${menuSlide ? 50 : 220 }px`}"
    >
      <div class="app-logo">
        <span class="logo" />
        <span
          class="j-menu"
          @click="toggleSlideMenu"
        >
          <i class="fa fa-bars fa-lg" />
        </span>
      </div>
      <Menu />
    </aside>
    <div class="main">
      <Head :app-name="appInfo.appName" />
      <article
        id="content"
        class="main-content"
      >
        <div id="innerModalRoot" />
        <div id="innerToastRoot" />
        <div id="innerLoading" />
        <router-view />
      </article>
    </div>
    <div id="outModalRoot" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Menu from "./js/main/menu.vue"
import Head from "./js/main/AppHead.vue"
import { fetchApi } from "@api/postData"
type obj = {
    message: string;
    t:string;
    child: string;
}
type appInfo = {
  appName: string;
  code: "user";
  logo: string;
  version: string;
}
@Component({
  components: {
    Menu,
    Head
  }
})
 class App extends Vue {
   menuSlide = false;
   appInfo: appInfo = {
      appName: "",
      code: "user",
      logo: "",
      version: ""
   };

   mounted ():void {
     fetchApi.post("login/appinfo", {
       code: "user"
     }).then(res => {
       this.appInfo = res.data
     })
   }

   toggleSlideMenu ():void {
     this.menuSlide = !this.menuSlide
   }
}
export default App
</script>

<style lang="scss">
@import "./css/scss/variate";
$headH: 60px;

#app {
  height: 100%;
  display: flex;
}

.left-aside {
  background: #577aaf;
  height: 100%;
}

.app-logo {
  display: flex;
  height: $headH;
  color: white;
  background: #5576aa;
  align-items: center;
  padding-right: 10px;

  .logo {
    flex: 1;
    height: 50px;
    background: url("./assert/imgs/app_logo.svg") no-repeat center;
  }

  .j-menu {
    cursor: pointer;
  }
}

.left-aside.active {
  .logo {
    display: none;
  }
}

.main {
  flex: 1;
  height: 100%;

  .main-content {
    background: #fafafb;
    width: 100%;
    height: 100%;
  }
}

.main-header {
  height: $headH;
  box-shadow: $shadow;
}

#content {
  height: calc(100% - #{$headH});
  position: relative;
}
</style>
