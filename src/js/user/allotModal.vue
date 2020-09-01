<template>
  <Modal
    title="用户授权角色"
    field="allotModal"
    :toggle-modal="modalOpt"
    :show="allotModal"
    :sure="sure"
  >
    <template>
      <div class="m-main">
        <TreeGrid
          ref="rolesTree"
          :style="{height: modalHeight + 'px'}"
          :data="rolesList"
          :checkbox="true"
          class="bor-grid"
          id-field="id"
          tree-field="name"
        >
          <GridColumn
            field="name"
            title="角色名"
            align="left"
            width="50%"
          />
          <GridColumn
            field="remark"
            title="备注"
            align="center"
            width="50%"
          />
        </TreeGrid>
      </div>
    </template>
  </Modal>
</template>

<script lang='ts'>
import Vue, { PropType } from "vue"
import Component from "vue-class-component"
import Modal from "@component/modal/index.vue"
import { TreeGrid } from "vx-easyui"
// import toastFn from "@component/Toast/index"
// import Api from "@api/user"

type roleType = {
  code: string;
  homePage: string;
  name: string
  remark: string
  roleList: {
    id:string;
  }[];
  children: {
    id:string;
  }[];
}
const ModalProps = Vue.extend({
    name: "AllotModal",
    components: {
      Modal
    },
    props: {
      rolesList: {
        type: Array as PropType<roleType[]>,
        default: null
      }
    }
})

@Component
export default class AllotModal extends ModalProps {
  allotModal = false;
  modalHeight = window.innerHeight - 240;
  $refs!:{
    rolesTree: TreeGrid
  }

  showModal ():void{
    this.allotModal = true
    setTimeout(() => {
      this.fillin()
    }, 500)
  }

  modalOpt (filed: "allotModal", isOpen:boolean):void {
    this[filed] = isOpen
  }

  fillin ():void {
    const childData = this.rolesList.map(item => {
      return item.children
    })
    const concatData = ([] as typeof childData[0]).concat.apply([], childData)
    concatData.map(sub => {
      this.$refs.rolesTree.uncheckRow(sub)
    })
    // 先消再勾
    const { roles } = this.$parent.$data.selectRow as { roles: {id:string}[]}
    roles.map(item => {
      const json = concatData.filter(sub => {
        return sub.id === item.id
      })[0]
      this.$refs.rolesTree.checkRow(json)
    })
  }

  sure ():void {
    const arr = this.$refs.rolesTree.getCheckedRows()
    console.log(arr)
    // AJAX
    // Api.dealUser(url, submitData).then(() => {
    //   toastFn.add(`${hitTxt}成功！`)
    //   this.dealModal = false
    //   this.$parent.getList()
    // })
  }
}
</script>
<style lang="scss">
.m-main {
  width: 500px;
  overflow: auto;
}
</style>
