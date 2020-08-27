<template>
  <div id="innerToastRooterr">
    <div class="g-notification">
      <Notice
        v-for="item in messages"
        :id="item.id"
        :key="item.id"
        :type="item.type"
        @close="remove"
      >
        {{ item.text }}
      </Notice>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Notice from "./Notice.vue"
type messageItem = {
  id: string;
  text: string;
  type: "error" | "success" | "warn";
  timerId?: number;
};
@Component({
  components: {
    Notice
  }
})
export default class Toast extends Vue {
  messages: messageItem[] = [];
  add (obj: messageItem): void {
    this.messages.push(obj)
  }

  clickFn (e: MouseEventEl<HTMLDivElement>): void {
    const dom = e.currentTarget!
    const id = dom.dataset.id!
    this.remove(id)
  }

  remove (id: string): void {
    this.messages = this.messages.filter((val) => {
      return val.id !== id
    })
  }

  clear (): void {
    const messages = this.messages
    if (!messages.length) {
      return
    }
    // 清除定时器
    messages.forEach((val) => {
      const { timerId } = val
      if (timerId) {
        window.clearTimeout(timerId)
      }
    })
    this.messages.length = 0
  }
}
</script>

<style lang="scss">
.g-notification {
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 20;
  text-align: right;
  max-width: 50%;
  overflow: hidden;
  padding: 0 6px;
}
</style>
