<template>
  <div class="m-fixTabBody">
    <table>
      <tbody>
        <tr
          v-for="(node,index) in tableData"
          :key="node[fileObj.idField]"
        >
          <td
            v-if="!fileObj.noOrder"
            class="td-left"
          >
            <span>
              {{ getOrder(index) }}
            </span>
          </td>
          <td
            v-for="column in fileObj.column"
            :key="column.field"
            :class="'td-' + column.align"
          >
            <VNode
              :node="node"
              :column="column"
              :tab-field="fileObj.tabField"
              :index="index"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue, { CreateElement, RenderContext } from "vue"
import { Component, Prop } from "vue-property-decorator"
import { fieldObj, IColumnItem } from "./myTable"
import Button from "@component/button/index.vue"
@Component({
    name: "TBody",
    components: {
      Button,
      VNode: {
        functional: true,
        render: (h:CreateElement, ctx: RenderContext) => {
          const { node, column, tabField, index } = ctx.props
          const a = column.formatter ? column.formatter(node, index, tabField) : h("span", node[column.field])
          return a
        }
      }
    }
})
export default class Table extends Vue {
    @Prop(Number) curPage!:number; // 当前页码
    @Prop(Number) perNums!:number; // 当前每页显示的条数
    @Prop({ required: true }) tableData!: anyObj[]; // 当前页的数据
    @Prop({ required: true }) fileObj!:fieldObj;
    // changeHandle: ITableFn["changeState"];
    // selectfn:(e:React.MouseEvent<HTMLTableCellElement>)=>void;
   getOrder (index:number):number {
       const startIndex = (this.curPage - 1) * this.perNums
       return startIndex + 1 + index
   }

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   getTdText (node:anyObj, column:IColumnItem, nodeIndex:number):any {
       const a = column.formatter ? column.formatter(node, nodeIndex, this.fileObj.tabField) : node[column.field]
       return a
   }
}
</script>

<style>
.g-TBody {
  background: red;
}
</style>
