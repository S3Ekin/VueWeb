<template>
  <div class="drop-ul">
    <div class="g-search">
      <input
        class="search-inp"
        placeholder="搜索关键字..."
      >
      <span
        class="close"
      >
        <SvgIcon class-name="fa-search" />
      </span>
    </div>
    {{ treeData.length ? treeData[0].expand : "ddd" }}
    <ul
      :style="{maxHeight: maxHeight ? maxHeight + 'px' : undefined, overflow: 'auto'}"
    >
      <template
        v-for="(val, oindex) in treeData"
      >
        <ParItem
          v-if="val[filedObj.childField].length"
          :key="val[filedObj.idField]"
          :node="val"
          :index="oindex + ''"
          :lev="0"
          :click-fn="clickItem"
          :check-method="check"
          :check-for-par="checkForPar"
          :toggle-expand="expandToggle"
        />
        <DropItem
          v-else
          :key="val[filedObj.idField]"
          :node="val"
          :index="oindex + ''"
          :lev="0"
          :click-fn="clickItem"
          :check-method="check"
          :check-box="filedObj.multiply"
        />
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Inject, Watch } from "vue-property-decorator"
import { ISelected, filedObj, treeNode, drop } from "./Combobox"
import ParItem from "./util/ParItem.vue"
import Search from "@component/search/index.vue"
import { SvgIcon } from "@component/Icon/index"
import { activeStatus, formatterTreeData } from "./util/util"
import DropItem from "./util/DropItem.vue"

type tree = treeNode<activeStatus>
@Component({
    name: "ComboTree",
    components: {
        ParItem,
        SvgIcon,
        Search,
        DropItem
    }
})
export default class ComboTree extends Vue {
    @Prop({ required: true, type: Array }) data!: anyObj[];
    @Prop({ required: true, type: Function }) initSelect!: drop<"list">["initSelect"]
    @Prop({ required: true, type: Function }) changeSelect!:drop<"list">["changeSelect"]
    @Prop({ required: true, type: Function }) bindMethod!:drop<"list">["bindMethods"]
    @Prop(Array) selected!: ISelected[];
    @Prop(Object) initComboVal?:{id:string}; // 外部通过这个值来控制下拉框的选中,id可以是字符串分隔
    @Prop({ type: Number, required: true }) maxHeight!:number;
    @Inject() filedObj!: filedObj<"tree">;
    treeData: tree[] = []; // 注意必须先初始化值，让vue对据据进行 observe
    oldSelectedIndex = ""
    @Watch("data")
    updateDataByData ():void {
      const { initComboVal, filedObj: { defaultVal } } = this
      const val = initComboVal ? initComboVal.id : defaultVal
      this.initData(val)
    }

    @Watch("initComboVal")
    updateDataByInitComVal ():void {
      const { initComboVal } = this
      const val = initComboVal ? initComboVal.id : ""
      this.initData(val)
    }

    initData (defaultVal:string):void {
      const prop = this.getProp()
      const obj = formatterTreeData(prop as drop<"tree">, defaultVal, this.data, true)
      this.treeData = obj.data
      this.oldSelectedIndex = obj.oldSelectedIndex
    }

    created ():void{
      this.initData(this.filedObj.defaultVal)
      this.bindMethod(this.clickItem, "click")
    }

    getProp (): drop<"tree"> {
      const prop = Object.assign({ filedObj: this.filedObj }, this.$props)
      return prop as drop<"tree">
    }

    clear ():void {
      this.initData("")
      this.changeSelect([])
    }

    check (value:string):void {
        console.log(value)
    }

    expandToggle (index:string):void {
      const { filedObj: { childField } } = this
      const indexArr = index.split(",").join(`,${childField},`).split(",")
      const node = this.getNodeByPath(indexArr, this.treeData)
      node.expand = !node.expand
    }

    checkForPar (val:string):void {
        console.log(val)
    }

    getNodeByPath (pathArr:string[], data: tree[]): tree {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let node:any = data
        pathArr.forEach(path => {
            node = node[path] || {}
        })
        return node as tree
    }

    clickItem (index?: string):void {
        const { filedObj, selected, changeSelect } = this
        if (!index) {
          this.clear()
          return
        }
        const multipy = filedObj.multiply
        const idField = filedObj.idField
        const textField = filedObj.textField
        const childField = filedObj.childField
        const clickForbid = filedObj.clickOrCheckForbid!
        const comField = filedObj.field
        const indexArr = index.split(",").join(`,${childField},`).split(",")
        const indexArrString = indexArr.join(",")
        const _data = this.treeData
        const oldSelectedIndex = this.oldSelectedIndex
        let _select = selected.map(val => val)
        const newNode = this.getNodeByPath(indexArr, _data)
        if (!newNode) {
            return
        }
        // 判断是否禁止点击
        if (clickForbid && clickForbid(newNode, comField, selected)) {
            return
        }
        // 单选清除以前选中的
        if (oldSelectedIndex === indexArrString) {
            // 点击的是同一个
            return
        }
        if (oldSelectedIndex) {
            this.getNodeByPath(oldSelectedIndex.split(","), _data).active = activeStatus.noSelect
        }
        _select = []
        // 判断这个node有没有被选中
        const active = newNode.active === activeStatus.select
                ? activeStatus.noSelect
                : activeStatus.select

        if (active === activeStatus.select) {
            _select.push({
                id: newNode[idField],
                text: newNode[textField]
            })
        } else {
            if (multipy) {
                _select = _select.filter(_val => {
                    return _val.id !== newNode[idField]
                })
            }
        }
        newNode.active = active
        changeSelect(_select, newNode)
        this.oldSelectedIndex = indexArrString
    }
}
</script>
<style lang="scss">
@import "../../css/scss/variate";
$active:#82bbf8;

.g-combo {
  .g-search {
    display: flex;
    border-radius: 3px;
    border: 1px solid #c6c9cf;
    background: none;
    height: 26px;
    margin: 6px;

    &:hover {
      border-color: $active;
    }
  }

  .search-inp {
    cursor: pointer;
    border: none;
    text-indent: 0.5em;
    outline: 0;
    color: #5b5b5b;
    flex: 1;
  }

  .close {
    padding: 2px 4px;

    .icon {
      font-size: 22px;
    }
  }
}

</style>