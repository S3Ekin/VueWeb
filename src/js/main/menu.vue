<template>
  <div class="menu-box">
    <div
      v-for="list in menuData"
      :key="list.code"
      class="menu-par-box"
    >
      <div
        class="menu-par menu-item"
        :data-code="list.code"
        :class="{active: list.active}"
        @click="toggleMenu"
      >
        <span>
          <i
            class="fa"
            :class="list.icon"
          />
          <span class="a-hidden">{{ list.name }}</span>
        </span>
        <span class="a-hidden">
          <i
            class="fa "
            :class="{'fa-arrow-right-line': !list.active,'fa-arrow-bottom-line':list.active}"
          />
        </span>
      </div>
      <transition name="">
        <div class="menu-list">
          <div
            v-for="menu in list.menuChildList"
            :key="menu.code"
            :data-code="menu.code"
            :class="{active:menu.active}"
            class="menu-item menu-child"
            @click="navMenuItem"
          >
            <div>
              {{ menu.name }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
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
    menuChildList: menuItem[];
    name: string;
    rank: string;
    remark: string;
    sn: string;
    tag: string;
    url: string;
    version: string;
    active: boolean;
  }
  @Component
  export default class Menu extends Vue {
     menuData: menuItem[] = [];
     mounted ():void {
         fetchApi.get("power/getMyAllMenu", {
           userCode: "demo",
           appCode: "user"
         }).then(res => {
           this.menuData = res.data.menuChildList.map((val: menuItem) => {
             val.active = false
             val.menuChildList = val.menuChildList.map((node:menuItem) => {
                node.active = false
                return node
             })
             return val
           })
         })
     }

     toggleMenu (e:MouseEvent & {currentTarget:HTMLDivElement}):void {
       const dom = e.currentTarget
       const code = dom.dataset.code
       this.menuData = this.menuData.map(val => {
         if (val.code === code) {
           val.active = !val.active
         }
         return val
       })
     }

     navMenuItem (e:MouseEvent & {currentTarget:HTMLDivElement}):void {
       const dom = e.currentTarget
       const code = dom.dataset.code
       const parCode = (dom.parentElement?.previousElementSibling as HTMLDivElement).dataset.code
       this.menuData = this.menuData.map(val => {
         if (val.code === parCode) {
           val.menuChildList = val.menuChildList.map(node => {
             if (node.code === code) {
               node.active = true
             } else {
               node.active = false
             }
             return node
           })
         } else {
           val.menuChildList = val.menuChildList.map(node => {
               node.active = false
              return node
           })
         }
         return val
       })
     }
  }
</script>

<style lang="scss">
@import "../../css/scss/variate";
$headH: 60px;
$activeBg: #7899cb;

.menu-box {
  color: white;
  height: calc(100% - #{$headH});
  overflow: auto;
  overflow-x: hidden;
  padding: 10px 0;
  box-sizing: border-box;
}

.menu-par-box {
  position: relative;
}

.menu-item {
  padding: 14px 12px 14px 20px;
  cursor: pointer;

  &:hover {
    background: $activeBg;
  }

  &.menu-child {
    padding-left: 42px;

    &.active {
      background: $activeBg;
    }
  }

  &.menu-par {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
  }
}

.left-aside.active {
  .app-logo {
    padding-left: 16px;
  }

  .a-hidden {
    display: none;
  }

  .menu-box {
    overflow: initial;
  }

  .menu-item {
    padding-left: 16px;
  }

  .menu-list {
    position: absolute;
    width: 220px;
    background: #577aaf;
    left: 50px;
    top: 0;
    display: none;
  }

  .menu-par-box {
    &:hover {
      .menu-list {
        display: block;
      }
    }
  }
}
</style>
