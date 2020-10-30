<template>
  <ul
    class="drop-ul"
    :style="{maxHeight: maxHeight ? maxHeight + 'px' : undefined}"
  >
    <DropItem
      v-for="(node, index) in listData"
      :key="node[filedObj.idField]"
      :node="node"
      :index="index+''"
      :click-fn="clickItem"
    />
  </ul>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Inject } from "vue-property-decorator"
import { ISelected, filedObj, node, drop } from "./Combobox"
import DropItem from "./util/DropItem.vue"
import { activeStatus, formatterListData } from "./util/util"

type obj<p> = {
  t:p,
  fn: (a:p) => p
}

const a:obj<string> = {
  t: "2",
  fn: function (c) {
      console.log(c)
      return c
  }
}
a.fn("aa")

const obj

type fn<p>= (k:p)=>void;

const fn:fn<string> = function (k:string) {
  return k
}

fn("2")

const fc = function<p> (k: p):p {
  return k
}

fc(3)

@Component({
    name: "ComboList",
    components: {
        DropItem
    }
})
export default class ComboList extends Vue {
    @Prop({ required: true, type: Array }) data!: anyObj[];
    @Prop({ required: true, type: Function }) initSelect!: drop<"list">["initSelect"]
    @Prop({ required: true, type: Function }) changeSelect!:drop<"list">["changeSelect"]
    @Prop({ required: true, type: Function }) bindMethod!:drop<"list">["bindMethods"]
    @Prop(Array) selected!: ISelected[];
    @Prop(Number) maxHeight?: number;
    @Inject() filedObj !:filedObj<"list">;
    listData: node<activeStatus>[] = []; // 注意必须先初始化值，让vue对据据进行 observe
    singleClickPre = ""
    created ():void{
      const { defaultVal } = this.filedObj
      const prop = this.getProp()
      const obj = formatterListData(prop as drop<"list">, defaultVal)
      this.listData = obj.data
      this.singleClickPre = obj.singleClickPre
      this.bindMethod(this.clickItem, "click")
    }

    getProp (): drop<"list"> {
      const prop = Object.assign({ filedObj: this.filedObj }, this.$props)
      return prop as drop<"list">
    }

    clear ():void {
      this.listData.forEach(val => {
        val.active = activeStatus.noSelect
      })
      this.singleClickPre = ""
      this.changeSelect([])
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
        const clickForbid = filedObj.clickOrCheckForbid
        const comField = filedObj.field

        const oldSelectedIndex = this.singleClickPre
        const _data = this.listData
        let _select = selected.map(val => val)
        const newNode = _data[+index]
        if (!newNode) {
            return undefined
        }
        // 判断是否禁止编辑
        if (clickForbid && clickForbid(newNode, comField, selected)) {
                return undefined
        }

        // 单选清除以前选中的
        if (!multipy) {
            if (oldSelectedIndex === index) {
                // 点击的是同一个
                return undefined
            }
            if (oldSelectedIndex && _data[+oldSelectedIndex]) {
                _data[+oldSelectedIndex].active = activeStatus.noSelect
            }
            _select = []
        }

        // 改变当节点状态
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

        // 改变父类的props
        changeSelect(_select, newNode)
        if (!multipy) {
            this.singleClickPre = index
        }
    }
}
</script>
