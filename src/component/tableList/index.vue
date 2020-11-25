<template>
  <div
    class="g-table-wrap"
    :style="{height: height ? height +'px':null}"
    @click="boxClickEvent"
  >
    <div class="g-table">
      <div class="m-fixTabHead">
        <table>
          <thead>
            <tr>
              <th
                v-if="!noOrder || checkbox"
                class="td-left"
              >
                <span v-if="!checkbox">
                  序号
                </span>
                <CheckBox
                  v-else
                  type="checkbox"
                  :checked="allChecked === allChekedStatus.checked"
                  :has-checked="allChecked === allChekedStatus.hasChecked"
                  @click="allCheckEvent"
                >
                  全选
                </CheckBox>
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
      <div class="m-fixTabBody">
        <ScrollBox>
          <TBody
            :table-data="curPageData"
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
        </ScrollBox>
      </div>
      <PageSize
        v-if="!noPageNums"
        :cur-page="curPage"
        :per-nums="perNums"
        :total-nums="listData.length"
        :total-pages="totalPages"
        :change-state="changeState"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { fieldObj, IColumnItem, ITabApi, ITabNode } from "./myTable"
import TBody from "./TBody.vue"
import PageSize from "./PageSize.vue"
import { ScrollBox } from "@component/scroll/index"
import { CheckBox } from "@component/checkbox/index"
import { closertPar } from "@component/util/domUtil"

enum allCheckedStatus {
  checked = "checked",
  hasChecked = "hasChecked",
  noChecked = "noChecked"
}
@Component({
    name: "Table",
    components: {
        TBody,
        PageSize,
        ScrollBox,
        CheckBox
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

    // 把获取选中的项的函数传递给外部
    @Prop(Function) bindGetSelectedFn?:(tabApi:ITabApi)=>void;
    perNums= 20;
    curPage = this.initCurPage();
    fileObj:fieldObj = this.initFileObj()
    listData = this.formatterListData()
    private allChekedStatus = allCheckedStatus

    @Watch("data")
    updateListData ():void {
      this.listData = this.formatterListData()
    }

    created ():void {
      const { bindGetSelectedFn } = this
      bindGetSelectedFn && bindGetSelectedFn(this.tabApi)
    }

    tabApi:ITabApi = {
      setChecked: this.setChecked,
      getChecked: this.getChecked,
      setAll: this.setAll
    }

    getChecked (): anyObj<ITabNode>[] {
        return this.listData.filter(val => val.checked)
    }

    setAll (checked:boolean):void {
       this.listData.forEach(val => {
         val.checked = checked
       })
    }

    setChecked (setArr:string[], checked = true):void {
      if (setArr && setArr.length) {
        const { idField } = this
        let hasCount = 0
        this.listData.find(val => {
          if (setArr.includes(val[idField])) {
            val.checked = checked
            hasCount++
          }
          return hasCount === setArr.length
        })
      }
    }

    formatterListData (): anyObj<ITabNode>[] {
      const { defaultSel, idField } = this
      const defaultSelArr = defaultSel ? defaultSel.split(",") : []
      return JSON.parse(JSON.stringify(this.data)).map((val: anyObj) => {
        val.checked = defaultSelArr.includes(val[idField])
        return val
      })
    }

    allCheckEvent (e:MouseEventEl<HTMLLabelElement>) :void {
      e.stopPropagation()
      const { allChecked } = this
      const checked = allCheckedStatus.checked !== allChecked
      this.curPageData.forEach(val => {
        val.checked = checked
      })
    }

    initCurPage () :number {
        const { data, defaultSel, idField } = this
        if (!defaultSel) {
            return 1
        } else {
            // tslint:disable-next-line: triple-equals
            const index = data.findIndex(val => defaultSel.includes(val[idField!]))
            return index > -1 ? Math.ceil((index + 1) / this.perNums) : 1
        }
    }

    get totalPages ():number {
      const { data, perNums } = this
      return Math.ceil(data.length / perNums)
    }

    get curPageData ():anyObj<ITabNode>[] {
      const { curPage, perNums, noPageNums, listData } = this
      if (noPageNums) {
        return listData
      } else {
        const start = (curPage - 1) * perNums
        const end = start + perNums > listData.length ? listData.length : start + perNums
        return listData.slice(start, end)
      }
    }

    get allChecked ():allCheckedStatus {
      // 指的是当前页的全选
      return this.curPageData.every(val => val.checked) ? allCheckedStatus.checked : this.curPageData.some(val => val.checked) ? allCheckedStatus.hasChecked : allCheckedStatus.noChecked
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

    boxClickEvent (e:MouseEventEl<HTMLDivElement>):void { // 事件代理
      const par = closertPar(e.target, "m-lab-radio")
      if (!par) { return }
      const val = +par.dataset.value! - 1
      const checked = this.listData[val].checked
       this.listData[val].checked = !checked
    }

    changeState (k:string, val:number):void {
     this[k as "perNums"] = val
    }
}
</script>

<style lang="scss">
@import "../../css/scss/variate";

.g-table {
  height: calc(100% - 4px);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .m-label {
    margin-right: 0;
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
</style>
