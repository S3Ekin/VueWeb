<template>
  <div id="app">
    <button
      class="test"
      @click="hello"
    >
      {{ message }}
    </button>
    <div>
      {{ test }}
      <input
        v-model="name"
      >
    </div>
    <TSXCom />
  </div>
</template>

<script lang="ts">
// import Vue, { VNode, CreateElement } from "vue"
import Vue from "vue"
import Component from "vue-class-component"
import TSXCom from "./component/test"
type obj = {
    message: string;
    t:string;
    child: string;
}
@Component({ components: { TSXCom } })
 class App extends Vue {
   test = "t333est"
   data ():obj {
     return {
       message: "message",
       t: "er",
       child: "er"
     }
   }

   created ():void{
      console.log(23)
   }

   get name ():string {
     return this.test
   }

   set name (value:string) {
     this.test = value + "val"
   }

   hello ():void {
     alert("hello")
   }

  //  render (h:CreateElement): VNode {
  //    return h("span", "tttt")
  //  }
}
export default App
</script>

<style lang="scss">
  .test {
    color: red;
  }
</style>
