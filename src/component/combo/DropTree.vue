<template>
  <div class="drop-ul">
    <div class="g-search">
      <input
        v-model="searchKey"
        class="search-inp"
        placeholder="搜索关键字..."
        @change="searchChange"
      >
      <span class="icon-box">
        <span
          v-if="searchKey"
          class="close"
          @click="clearSearch"
        >
          <SvgIcon class-name="fa-close" />
        </span>
        <span
          class="search"
          @click="search"
        >
          <SvgIcon class-name="fa-search" />
        </span>
      </span>
    </div>
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
          :check-par="checkForParFn"
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
import { activeStatus, formatterTreeData, cascade, getNodeByPath, findNodeAndPathById } from "./util/util"
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
    searchKey = ""
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
      const obj = formatterTreeData(prop as drop<"tree">, defaultVal, this.data)
      this.treeData = obj.data
      this.oldSelectedIndex = obj.oldSelectedIndex
    }

    searchChange (e:MouseEventEl<HTMLInputElement>):void {
      const inp = e.target
      const val = inp.value.trim()
      this.searchKey = val
      this.search()
    }

    searchMap (
      data: tree[],
      childField: filedObj<"tree">["childField"],
      key: string,
      textField: string
    ):tree[] {
      return data.filter(val => {
        const itemText = val[textField]
        const isContainer = itemText.includes(key)
        const child = val[childField]

        if (child && child.length) {
          if (isContainer) {
            return true
          } else {
            const arr = this.searchMap(child, childField, key, textField)
            val[childField] = arr
            return arr.length
          }
        } else {
          return isContainer
        }
      })
    }

    search () :void {
      if (!this.searchKey) {
        return
      }
      const key = this.searchKey
      const { filedObj, data, selected } = this
      const childField = filedObj.childField!
      const textField = filedObj.textField
      const prop = this.getProp()
      const copyData = JSON.parse(JSON.stringify(data))
      const searchReswult = this.searchMap(copyData, childField, key, textField)

      const defaultVal = selected.map(val => val.id).join(",")
      const obj = formatterTreeData(prop, defaultVal, searchReswult, true)
      this.treeData = obj.data
    }

    clearSearch ():void {
      const { selected } = this
      this.searchKey = ""
      const prop = this.getProp()
      const defaultVal = selected.map(val => val.id).join(",")
      const { data } = formatterTreeData(prop as drop<"tree">, defaultVal, this.data, true)
      this.treeData = data
    }

    created ():void{
      this.initData(this.filedObj.defaultVal)
      this.bindMethod(this.select, "click")
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
      const { filedObj, selected } = this
      const childField = filedObj.childField!
      const idField = filedObj.idField
      const textField = filedObj.textField
      const clickForbid = filedObj.clickOrCheckForbid!
      const comField = filedObj.field
      const indexArr = value
        .split(",")
        .join(`,${childField},`)
        .split(",")

        let _data = this.treeData
        let _select = selected.map(val => val)
        const newNode = getNodeByPath(indexArr, _data)
        if (!newNode) {
          return
        }
        // 判断是否禁止点击
        if (clickForbid && clickForbid(newNode, comField, selected)) {
          return
        }

        // 判断这个node有没有被选中
        const active =
            newNode.active === activeStatus.select
              ? activeStatus.noSelect
              : activeStatus.select

          if (active === activeStatus.select) {
            _select.push({
              id: newNode[idField],
              text: newNode[textField]
            })
          } else {
            _select = _select.filter(_val => {
              return _val.id !== newNode[idField]
            })
          }
          newNode.active = active

        _data = cascade(value, _data, childField)
        this.changeSelect(_select, newNode)
    }

    mapFn (
        list: tree[],
        active: activeStatus,
        select: ISelected[],
        filedObj: {
          idField: string;
          textField: string;
          childField: string;
        }
      ):{
          arr: tree[],
          selecte: ISelected[]
      } {
        let _select = select
        const { idField, childField, textField } = filedObj
        const arr = list.map(val => {
          const _child = val[childField as "children"]
          const _node = val
          if (_child.length) {
            const result = this.mapFn(_child, active, _select, filedObj)
            _node[childField] = result.arr
            // 改变select
            _select = result.selecte
          } else {
            if (active === activeStatus.select) {
              // 清除之前选的，现在再选一次，保证选择的顺序
              if (_node.active === activeStatus.select) {
                _select = _select.filter(_val => {
                  return _val.id !== _node.idField
                })
              }
               _select.push({
                id: _node[idField],
                text: _node[textField]
              })
            } else {
              _select = _select.filter(_val => {
                return _val.id !== _node[idField]
              })
            }
          }
           _node.active = active
           return _node
        })

        return {
          arr: arr,
          selecte: _select
        }
      }

    checkForParFn (value: string):void {
      const { filedObj, selected } = this
      const childField = filedObj.childField!
      const idField = filedObj.idField
      const textField = filedObj.textField
      const clickForbid = filedObj.clickOrCheckForbid
      const comField = filedObj.field
      const indexArr = value
        .split(",")
        .join(`,${childField},`)
        .split(",")

        const _data = this.treeData
        let _select = selected.map(val => val)
        const newNode = getNodeByPath(indexArr, _data)

        if (!newNode) {
          return
        }
        // 判断是否禁止点击
        if (clickForbid && clickForbid(newNode, comField, selected)) {
          return
        }
          // 判断这个node有没有被选中
          const node = newNode
          const active =
            node.active === activeStatus.select
              ? activeStatus.noSelect
              : activeStatus.select

          // 选中所有的子文件
          const _child = newNode[childField]

            const result = this.mapFn(_child, active, selected, {
              idField,
              childField,
              textField
            })
           newNode[childField] = result.arr
           newNode.active = active
            // 改变selecte
            _select = result.selecte

        cascade(value, _data, childField)
        this.changeSelect(_select, newNode)
    }

    expandToggle (index:string):void {
      const { filedObj: { childField } } = this
      const indexArr = index.split(",").join(`,${childField},`).split(",")
      const node = getNodeByPath(indexArr, this.treeData)
      node.expand = !node.expand
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
        const newNode = getNodeByPath(indexArr, _data)
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
            getNodeByPath(oldSelectedIndex.split(","), _data).active = activeStatus.noSelect
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

    select (id?:string):void {
      if (!id) {
          this.clear()
          return
      }
      const { filedObj: { childField, multiply, idField } } = this
      const { node, path } = findNodeAndPathById(this.treeData, "", {
        childField,
        idField,
        targetId: id
      })

      if (!node) {
        return
      }

      if (node[childField].length) {
        multiply && this.checkForParFn(path)
      } else {
        multiply ? this.check(path) : this.clickItem(path)
      }
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

  .icon {
    font-size: 22px;
  }

  .icon-box {
    display: flex;
    padding-top: 3px;

    .icon {
      cursor: pointer;

      &:hover {
        color: red;
      }
    }
  }
}

</style>
