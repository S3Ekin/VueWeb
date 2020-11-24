<template>
  <table>
    <tbody>
      <tr
        v-for="(node,index) in tableData"
        :key="node[fileObj.idField]"
      >
        <td
          v-if="!fileObj.noOrder || fileObj.checkbox"
          class="td-left"
        >
          <CheckBox
            v-if="fileObj.checkbox"
            :checked="node.checked"
            :value="startIndex + index + ''"
            type="checkbox"
          >
            <b v-if="!fileObj.noOrder">
              {{ startIndex + index }}
            </b>
          </CheckBox>
          <b v-else>
            {{ startIndex + index }}
          </b>
        </td>
        <td
          v-for="column in fileObj.column"
          :key="column.field"
          :class="'td-' + column.align"
        >
          <slot
            :name="column.field"
            :node="node"
            :index="index"
          >
            {{ node[column.field] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { fieldObj, ITabNode } from "./myTable"
import { CheckBox } from "@component/checkbox/index"
@Component({
    name: "TBody",
    components: {
      CheckBox
    }
})
export default class Table extends Vue {
    @Prop(Number) curPage!:number; // 当前页码
    @Prop(Number) perNums!:number; // 当前每页显示的条数
    @Prop({ required: true }) tableData!: anyObj<ITabNode>[]; // 当前页的数据
    @Prop({ required: true }) fileObj!:fieldObj;
    // selectfn:(e:React.MouseEvent<HTMLTableCellElement>)=>void;
   get startIndex ():number {
       const startIndex = (this.curPage - 1) * this.perNums
       return startIndex + 1
   }
}
</script>

<style>
.g-TBody {
  background: red;
}
</style>
