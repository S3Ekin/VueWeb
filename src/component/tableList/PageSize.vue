<template>
  <div class="g-pageCode">
    <div class="g-pageLeft">
      <div class="m-page-total">
        <span>共 {{ totalPages }} 页</span>

        <span>{{ totalNums }}条</span>
      </div>
      <div :style="{display: 'flex', alignItems: 'center',}">
        <span>每页显示：</span>
        <ComboList
          field="pageNums"
          :data="pageNumsArr"
          :width="100"
          :direction-up="true"
          :click-callback="perNumComboClick"
          :default-val="perNums + ''"
        />
        <span>&nbsp;条</span>
      </div>
    </div>

    <div class="g-pageRight">
      <div :style="{marginRight: '20px'}">
        <span>跳转到</span>
        <input
          class="j-jump-page s-inp normal"
          :value="curPage"
          type="number"
          min="1"
          @change="curNumInpHandle"
          @keydown.enter="curNumInpHandle"
        >
      </div>

      <div
        class="m-code-number"
        @click="controlBtnHandle"
      >
        <span
          class="m-page-num"
          data-type="pre"
        >
          <SvgIcon
            class-name="fa-arrow-left-line"
            size="middle"
          />
        </span>
        <template v-if="totalPages < 11">
          <span
            v-for="val in totalPages"
            :key="val"
            class="m-page-num"
            :class="{active: val== curPage}"
            :data-num="val"
          >
            <b>{{ val }}</b>
          </span>
        </template>
        <template v-else>
          <span
            class="m-page-num"
            :class="{active: 1 == curPage}"
            :data-num="1"
          >
            1
          </span>
          <b v-if="curPage > 4">...</b>
          <span
            v-for="val in showCodeCount"
            :key="val"
            class="m-page-num"
            :class="{active: val + showCodeStart == curPage}"
            :data-num="val + showCodeStart"
          >
            {{ val + showCodeStart }}
          </span>
          <b v-if="curPage < totalPages - 3">...</b>
          <span
            class="m-page-num"
            :class="{active: totalPages == curPage}"
            :data-num="totalPages"
          >
            {{ totalPages }}
          </span>
        </template>
        <span
          class="m-page-num"
          data-type="next"
        >
          <SvgIcon
            class-name="fa-arrow-right-line"
            size="middle"
          />

        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { ComboList } from "@component/combo/index"
import { ISelected } from "@component/combo/Combobox.d"
import { SvgIcon } from "@component/Icon/index"
import { ITableFn } from "./myTable"
import { closertPar } from "@component/util/domUtil"
const pageNumsArr = [
  { id: "10", text: "10" },
  { id: "20", text: "20" },
  { id: "30", text: "30" },
  { id: "50", text: "50" },
  { id: "100", text: "100" }
]
@Component({
    name: "PageSize",
    components: {
      ComboList,
      SvgIcon
    }
})
export default class PageSize extends Vue {
    @Prop(Number) perNums!: number; // 每页条数
    @Prop(Number) curPage!: number; // 当前的页码
    @Prop(Number) totalPages!: number; // 总页数
    @Prop(Number) totalNums!: number; // 总条数
    @Prop({ required: true, type: Function }) changeState!: ITableFn["changeState"];
    pageNumsArr = pageNumsArr
    get showCodeCount ():number {
      const { curPage, totalPages } = this
      return curPage > 4 && curPage < totalPages - 3 ? 5 : 4
    }

    get showCodeStart ():number {
      const { curPage, totalPages } = this
      return curPage < 5 ? 1 : curPage > totalPages - 4 ? totalPages - 5 : curPage - 2
    }

    perNumComboClick (selArr:ISelected[]):void {
        this.changeState("perNums", +selArr[0].id)
        this.changeState("curPage", 1)
    }

    curNumInpHandle (e:MouseEventEl<HTMLInputElement>):void {
      let val = +e.target.value
      val = val < 1 ? 1 : val > this.totalPages ? this.totalPages : val
      this.changeState("curPage", val)
      e.target!.value = val + ""
    }

    controlBtnHandle (e:MouseEventEl<HTMLSpanElement>):void {
      const dom = e.target
      const par = closertPar(dom, "m-page-num")
      if (!par) {
        return
      }
      const type = par.dataset.type
      const { curPage, changeState, totalPages } = this
      if (type) {
          let page = curPage
        if (type === "pre") {
           page = Math.max(1, curPage - 1)
        } else {
           page = Math.min(totalPages, curPage + 1)
        }
        changeState("curPage", page)
      } else {
        const val = +par.dataset.num!
        changeState("curPage", val)
      }
    }
}
</script>

<style lang="scss">
@import "../../css/scss/variate";
$green: green;

.g-pageCode {
  margin: 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .m-page-total {
    display: flex;
    align-items: center;

    & > span {
      margin: 0 8px;
    }
  }

  .j-jump-page {
    margin: 0 6px;
    width: 80px;
    height: 28px;
    background: none;
    //color: white;
    color: #333;
    border-color: #e3e3e3;

    &:hover {
      color: $green;
      border-color: $green;
    }

    &:focus {
      color: $green;
      border-color: $green;
    }
  }

  .m-code-number {
    display: flex;
  }

  .m-page-num {
    line-height: 28px;
    text-align: center;
    background: #fff;
    border: solid 1px $normal;
    margin: 0 3px;
    border-radius: 4px;
    width: 28px;
    height: 28px;
    font-weight: bold;

    &:hover {
      color: $green;
      border-color: $green;
    }
  }

  .m-page-num.active {
    background: white;
    color: $green;
    border-color: $green;
  }

  .g-pageRight,
  .g-pageLeft {
    display: flex;
  }
}
</style>
