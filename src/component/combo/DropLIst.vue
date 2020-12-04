<template>
  <ul
    class="drop-ul"
    :style="{maxHeight: maxHeight ? maxHeight + 'px' : undefined}"
    @click="clickItemEvent"
  >
    <DropItem
      v-for="(node, index) in listData"
      :key="node[filedObj.idField]"
      :scoped-slots="$scopedSlots"
      :node="node"
      :index="index+''"
      :click-fn="clickItem"
    >
      <template v-slot="{itemNode}">
        <slot
          name="item"
          :item-node="itemNode"
        />
      </template>
    </DropItem>
  </ul>
</template>

<script lang="ts">
      // :slot-scope="$scopedSlots"
import Vue from "vue"
import { Component, Prop, Inject, Watch } from "vue-property-decorator"
import { ISelected, filedObj, node, drop } from "./Combobox"
import DropItem from "./util/DropItem.vue"
import { activeStatus, formatterListData } from "./util/util"
import { closertPar } from "@component/util/domUtil"

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
    @Prop(Object) initComboVal?:{id:string}; // 外部通过这个值来控制下拉框的选中,id可以是字符串分隔
    @Prop(Array) selected!: ISelected[];
    @Prop({ type: Number, required: true }) maxHeight!:number;
    @Inject() filedObj !:filedObj<"list">;
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

    listData: node<activeStatus>[] = []; // 注意必须先初始化值，让vue对据据进行 observe
    singleClickPre = ""

    initData (defaultVal:string):void {
      const prop = this.getProp()
      const obj = formatterListData(prop as drop<"list">, defaultVal)
      this.listData = obj.data
      this.singleClickPre = obj.singleClickPre
    }

    created ():void{
      this.initData(this.filedObj.defaultVal)
      this.bindMethod(this.select, "click")
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

    clickItemEvent (e:MouseEventEl<HTMLDivElement>):void { // 这里是在父元素上做的事件代理
      const dom = e.target
      const par = closertPar(dom, "m-combo-item")
      if (!par) {
        return
      }
      const index = par.dataset.index
      this.clickItem(index)
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
                    return `${_val.id}` !== `${newNode[idField]}`
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

    select (id?: string):void {
      if (!id) {
        this.clear()
        return
      }
      const { filedObj: { idField } } = this
      const index = this.listData.findIndex(val => `${val[idField]}` === `${id}`)
      index > -1 && this.clickItem(index + "")
    }
}
</script>
