<template>
  <div class="g-check-item">
    <span class="lab-tit"><slot /></span>
    <span
      class="g-check-box"
      @click="clickEvent"
    >
      <CheckBox
        v-for="item in data"
        :key="item.val"
        :type="type"
        :name="name"
        :data-set="dataSet"
        :value="item.val"
        :checked="item.val === select"
        :disabled="disabled"
      >
        {{ item.name }}
      </CheckBox>
    </span>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import { SvgIcon } from "@component/Icon/index"
  import CheckBox from "./CheckCom.vue"
  import { Component, Prop } from "vue-property-decorator"
import { closertPar } from "@component/util/domUtil"
  type data = {
    name:string;
    val:string;
  }[]

    @Component({
      name: "Checkbox",
      components: {
        SvgIcon,
        CheckBox
      }
    })
   export default class Checkbox extends Vue {
      @Prop({ required: true }) handle!:(tarGetDom:HTMLElement, e:MouseEvent)=>void;
      @Prop({ type: String, default: "radio" }) type!: "radio" | "checkbox";
      @Prop(String) name!: string;
      @Prop(String) dataSet!: string;
      @Prop({ required: true, default: [] }) data!: data;
      @Prop({ required: true }) select!: string;
      @Prop(Boolean) disabled!:boolean;

      clickEvent (e:MouseEventEl<HTMLSpanElement>):void {
        // 代理事件
        const dom = e.target
        const targetDom = closertPar(dom, "m-label")
        if (targetDom) {
          this.handle(targetDom, e)
        }
      }
    }
</script>

<style lang="scss">
.g-check-item {
  display: flex;
  align-items: center;
}
</style>
