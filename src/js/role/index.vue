<template>
  <div class="role-page">
    <div>
      <Button @click="click3">
        data {{ data.length }}
      </Button>
      <Button @click="click2">
        test {{ test }}
      </Button>
    </div>
    <div class="test-scroll">
      <ScrollBox>
        <div class="tab-list">
          <div
            v-for="val in data"
            :key="val.id"
            class="item"
          >
            <b>{{ val.id + 1 }}</b>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ val.text }}</span>
          </div>
        </div>
      </ScrollBox>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import { ScrollBox } from "@component/scroll/index"
import Button from "@component/button/index.vue"
@Component({
    name: "User",
    components: {
        ScrollBox,
        Button
    }
})
export default class User extends Vue {
  data = [
    { id: 1, text: "er1" },
    { id: 2, text: "er2" },
    { id: 3, text: "er3" },
    { id: 4, text: "er4" },
    { id: 5, text: "er5" },
    { id: 6, text: "eeee6" }
  ]

  test = 0

  updated ():void {
    console.log("update Root")
  }

  click3 ():void {
      this.data = new Array(Math.floor(Math.random() * 1000)).fill("").map((val, index) => {
          return {
              id: index,
              text: Math.floor(Math.random() * 30) * index
          }
      })
  }

  click2 ():void {
     this.test++
  }
}
</script>

<style lang="scss">
.role-page {
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .test-scroll {
    flex: 1;
    margin-top: 16px;
    overflow: hidden; //不加这个属性， 在没用显示指定 height 在子容器超出时，不能限制子容器的超出
  }

  .item {
    padding: 6px;
    color: white;
  }

  .item:nth-child(2n) {
    background: green;
  }

  .item:nth-child(2n - 1) {
    background: greenyellow;
  }
}
</style>
