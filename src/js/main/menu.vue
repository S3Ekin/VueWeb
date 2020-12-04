<template>
  <div class="menu-box">
    <ScrollBox
      :time="600"
    >
      <div
        v-for="list in menuData"
        :key="list.code"
        :class="{active: list.active}"
        class="menu-par-box"
      >
        <div
          class="menu-par menu-item"
          :data-code="list.code"
          @click="toggleMenu"
        >
          <span>
            <i
              class="fa"
              :class="list.icon"
            />
            <span class="">{{ list.name }}</span>
          </span>
          <span class="">
            <i
              class="fa "
              :class="{'fa-arrow-right-line': !list.active,'fa-arrow-bottom-line':list.active}"
            />
          </span>
        </div>
        <div class="menu-list-box">
          <div class="menu-list">
            <div
              v-for="menu in list.menuChildList"
              :key="menu.code"
              :data-code="menu.code"
              :class="{active:menu.active}"
              class="menu-item menu-child"
              @click.capture="navMenuItem"
            >
              <router-link
                :to="'/'+menu.url"
                class="nav-item"
                :replace="true"
              >
                {{ menu.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </ScrollBox>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import Api from "@api/main"
  import { Component, Watch } from "vue-property-decorator"
  import menuData from "../menu/data"
  import { ScrollBox } from "@component/scroll/index"
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

  @Component({
    name: "Menu",
    components: {
      ScrollBox
    }
  })
  export default class Menu extends Vue {
     menuData: menuItem[] = [];
     private preUrl = ""
     @Watch("menuData")
     updateH ():void {
       this.$nextTick().then(() => {
          this.initListBoxHeight()
        })
     }

     updated ():void {
       console.log("update")
     }

     initListBoxHeight ():void {
        const listBoxElArr = (this.$el as HTMLDivElement).getElementsByClassName("menu-list-box")
          const arr = [...listBoxElArr] as HTMLDivElement[]
          arr.forEach(dom => {
            const child = dom.firstElementChild!
            dom.style.cssText = `height:${child.clientHeight}px`
          })
     }

     mounted ():void {
           // eslint-disable-next-line @typescript-eslint/no-explicit-any
           this.menuData = (menuData.data.menuChildList as any[]).map((val:menuItem) => {
             val.active = false
             val.menuChildList = val.menuChildList.map((node:menuItem) => {
                node.active = false
                return node
             })
             return val
           })
           console.log(Api)
        //  Api.getMyAllMenu().then(res => {
        //    this.menuData = res.data.menuChildList.map((val: menuItem) => {
        //      val.active = false
        //      val.menuChildList = val.menuChildList.map((node:menuItem) => {
        //         node.active = false
        //         return node
        //      })
        //      return val
        //    })
        //  }).catch(() => {
        //    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //    this.menuData = menuData.data.menuChildList as any[]
        //  })
     }

     slideFn (dom:HTMLDivElement, isSlide:boolean):void {
       const slideDom = dom.nextElementSibling as HTMLDivElement
       if (!slideDom) {
         return
       }
       const child = slideDom.firstElementChild as HTMLDivElement
       const listH = child.clientHeight
       slideDom.style.cssText = `height:${!isSlide ? listH : 0}px`
     }

     toggleMenu (e:MouseEvent & {currentTarget:HTMLDivElement}):void {
       const dom = e.currentTarget
       const code = dom.dataset.code
       let isSlide = false
       let node:menuItem | undefined
      //  this.menuData.findIndex(val => {
      //    const isTarget = val.code === code
      //    if (isTarget) {
      //      node = val
      //    }
      //    return isTarget
      //  })

       this.menuData.findIndex(val => {
         const isTarget = val.code === code
         if (isTarget) {
           node = val
         }
         return isTarget
       })
       if (node) {
         // this.menuData[0].active =
          node.active = !node.active
         isSlide = node.active
       }
       this.slideFn(dom, isSlide)
     }

     navMenuItem (e:MouseEvent & {currentTarget:HTMLDivElement}):void {
       const dom = e.currentTarget
       const code = dom.dataset.code
       const parCode = (dom.parentElement?.parentElement?.previousElementSibling as HTMLDivElement).dataset.code
       let newUrl = ""
       this.menuData.forEach(val => {
         if (val.code === parCode) {
           val.menuChildList = val.menuChildList.map(node => {
             if (node.code === code) {
               node.active = true
               newUrl = "/" + node.url
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
       if (newUrl === this.preUrl) {
         this.$router.push("/redirect")
       }
       this.preUrl = newUrl
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

.menu-list-box {
  position: relative;
  overflow: hidden;
  transition: height 0.6s ease-in-out;

  .menu-list {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: #577aaf;
    z-index: 2;
  }
}

.menu-par-box {
  position: relative;

  // &.active {
  //   .menu-list {
  //   }
  // }
}

.menu-item {
  cursor: pointer;

  &:hover {
    background: $activeBg;
  }

  &.menu-child {
    &.active {
      background: $activeBg;
    }
  }

  &.menu-par {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    padding: 14px 12px 14px 20px;
  }

  .nav-item {
    display: block;
    color: white;
    padding: 14px 12px 14px 20px;
    padding-left: 40px;

    &.router-link-active {
      color: lighten($color:$activeBg, $amount: 8);
    }

    height: 100%;
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

  .menu-list-box {
    position: absolute;
    width: 220px;
    left: 50px;
    top: 0;
    display: none;
    overflow: initial;
  }

  .menu-list {
    position: relative;
  }

  .menu-par-box {
    &:hover {
      .menu-list-box {
        display: block;
      }
    }
  }
}
</style>
