<template>
  <div
    class="g-table-wrap"
    :style="{height: height ? height +'px':null}"
  >
    <div class="g-table">
      <div class="m-fixTabHead">
        <table>
          <thead>
            <tr>
              <th
                v-if="!noOrder"
                class="td-left"
              >
                序号
              </th>
              <th
                v-for="column in fileObj.column"
                :key="column.field"
                :class="'td-'+column.align"
              >
                {{ column.name }}
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <TBody
        :table-data="data"
        :file-obj="fileObj"
        :per-nums="perNums"
        :cur-page="curPage"
      >
        <template
          v-for="item in fileObj.column"
          v-slot:[item.field]="node"
        >
          <slot
            :name="item.field"
            v-bind="node"
          />
        </template>
      </TBody>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { fieldObj, IColumnItem } from "./myTable"
import TBody from "./TBody.vue"
@Component({
    name: "Table",
    components: {
        TBody
    }
})
export default class Table extends Vue {
    @Prop({ required: true }) data!: anyObj[];
    @Prop(Boolean) hasBorder?:boolean;
    @Prop(Number) height?:number;
    @Prop(Boolean) noPageNums?: boolean; // 页码
    @Prop({ required: true, type: String, default: "id" }) idField!:string; // 表格的节点标识
    @Prop(Boolean) checkbox?: boolean;// 多选
    @Prop(Boolean) noOrder?: boolean;// 序号
    @Prop(String) defaultSel?: string;// 默认选中的
    @Prop(String) tabField?: string;// 表格标识
    @Prop({ type: String, default: "当前没有数据！" }) emptyTxt!: string;// 空数据时显示文字
    @Prop() getCheckFn?:(fn:()=>void)=>void;// 获取选中的
    // initSelectVal?:{id:string};// 通过外界改变表格的选中
    // children:React.ReactElement<IColumnItem>[];
    // bindGetSelectedFn?:(getSelected:()=>IImmutalbeList<IImmutalbeMap<any>>)=>void;// 把获取选中的项的函数传递给外部
    perNums= 20;
    curPage = this.initCurPage();
    fileObj:fieldObj = this.initFileObj()

    initCurPage () :number {
        const { data, defaultSel, idField } = this
        if (!defaultSel) {
            return 1
        } else {
            // tslint:disable-next-line: triple-equals
            const index = data.findIndex(val => val[idField!] === defaultSel)
            return index > -1 ? Math.ceil((index + 1) / 20) : 1
        }
    }

    mounted ():void {
      this.fileObj.column = this.initColumn()
    }

    initColumn ():IColumnItem[] {
        const { $scopedSlots } = this
        const column: IColumnItem[] = []
        for (const key in $scopedSlots) {
          const slotArr = $scopedSlots[key]!({}) || []
            slotArr.forEach(val => {
                  if (val.tag) {
                      const item = val.componentOptions!.propsData as IColumnItem
                      const { field, width, isRowSpanField, formatter, align = "center", name } = item

                      column.push({
                        align,
                        name,
                        width,
                        isRowSpanField,
                        formatter,
                        field
                      })
                  }
              })
        }
        return column
    }

    initFileObj ():fieldObj {
        const { idField, noOrder, checkbox, tabField, noPageNums } = this
        const column: IColumnItem[] = []
        return {
            idField,
            noOrder,
            checkbox,
            tabField,
            noPageNums,
            column
        }
    }
}
</script>

<style lang="scss">
@import "../../css/scss/variate";

.g-table-wrap {
  height: 100%;
  overflow: auto;

  &.g-tab-border {
    td {
      border-right: 1px solid $normal;
      border-bottom: 1px solid $normal;

      &:first-child {
        border-left: 1px solid $normal;
      }
    }

    .m-fixTabBody {
      border-bottom: 1px solid $normal;
    }
  }
}

.g-table {
  height: calc(100% - 4px);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .m-label {
    margin-right: 6px;
  }

  table {
    width: 100%;
    table-layout: fixed;
  }

  td {
    padding: 6px 10px;
    height: 30px;
    word-break: break-all;
  }

  th {
    padding: 10px 10px;
  }

  .m-fixTabHead tr {
    border: none;
    //border-bottom:2px solid $themeColor;
  }

  .m-fixTabHead {
    background: #04a9f5;
    border-radius: 6px;
    color: white;
  }

  .m-fixTabBody {
    //overflow: auto;
    flex: 1;
    position: relative;

    tr:hover {
      background: #e6f7ff;
    }
  }

  .tab-over {
    padding-right: 18px;
  }

  tr.selected {
    background: #bfe6f9;
  }
}

</style>
