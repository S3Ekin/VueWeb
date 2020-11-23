<template>
  <div class="test">
    <div>
      <Button @click="click">
        改变数据
      </Button>
      <Button @click="click3">
        data
      </Button>
    </div>
    <div>
      <div
        v-for="val in list"
        :key="val.id"
      >
        <p>{{ val.text }}:   {{ val.toggle }} </p>
        <div>
          <p
            v-for="node in val.child"
            :key="node.id"
          >
            {{ node.text }}: {{ node.toggle }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import Button from "@component/button/index.vue"
@Component({
    name: "User",
    components: {
        Button
    }
})
export default class User extends Vue {
  list:anyObj[] = []
  @Prop() data!:anyObj[]

  @Watch("data")
  update (): void {
      this.list = [
            {
            id: 1,
            text: "er1",
            toggle: false,
            child: [
                { id: 12, text: "er12", toggle: false },
                { id: 13, text: "er13", toggle: true }
            ]
            },
            {
            id: 2,
            text: "er2",
            toggle: false,
            child: [
                { id: 22, text: "er22", toggle: false },
                { id: 23, text: "er23", toggle: true }
            ]
            },
            {
            id: 3,
            text: "er3",
            toggle: true,
            child: [
                { id: 32, text: "er32", toggle: false },
                { id: 33, text: "er33", toggle: true }
            ]
            }
        ]
  }

  click ():void {
    this.list = [
    {
      id: 1,
      text: "er1",
      toggle: false,
      child: [
          { id: 12, text: "er12", toggle: false },
          { id: 13, text: "er13", toggle: true }
      ]
    },
    {
    id: 2,
    text: "er2",
    toggle: false,
    child: [
          { id: 22, text: "er22", toggle: false },
          { id: 23, text: "er23", toggle: true }
      ]
    },
    {
    id: 3,
    text: "er3",
    toggle: true,
    child: [
          { id: 32, text: "er32", toggle: false },
          { id: 33, text: "er33", toggle: true }
      ]
    }
  ]
  }

  click3 ():void {
    this.list[0].toggle = true
    this.list[0].child[0].toggle = true
  }
}
</script>
