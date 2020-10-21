<template>
  <div class="g-pageSize">
    1
  </div>
</template>

<script lang="ts">

import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

@Component({
    name: "PageSize"
})
export default class Table extends Vue {
    @Prop(Number) perNums!: number; // 每页条数
    @Prop(Number) curPage!: number; // 当前的页码
    @Prop(Number) totalPages!: number; // 总页数
    @Prop(Number) totalNums!: number; // 总条数
    // changeHandle: ITableFn["changeState"];
}
</script>

<style lang="scss">
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

      .m-page-num {
        display: inline-block;
        text-align: center;
        //	background:#fff;
        border: solid 1px $normal;
        margin: 0 3px;
        padding: 6px 10px;
        border-radius: 4px;

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
