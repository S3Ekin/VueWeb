<template>
  <ul
    class="drop-ul"
  >
    <DropItem
      v-for="(node, index) in data"
      :key="node[filedObj.idField]"
      :node="node"
      :index="index+''"
    />
  </ul>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Inject } from "vue-property-decorator"
import { ISelected, filedObj } from "./Combobox"
import DropItem from "./util/DropItem.vue"

@Component({
    name: "ComboList",
    components: {
        DropItem
    }
})
export default class ComboList extends Vue {
    @Prop({ required: true, type: Array }) data!: anyObj[];
    @Prop(Array) selected!: ISelected[];
    @Inject() filedObj !:filedObj<"list">;
}
</script>
