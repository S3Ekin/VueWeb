<template>
  <div class="g-content">
    <div class="g-grid">
      <Head
        :modal-opt="modalOpenOpt"
      />
      <List
        :list="list"
        :reload-list="getList"
        :modal-opt="modalOpenOpt"
      />
    </div>
    <InfoModal
      :show="showInfoModal"
      :toggle-modal="toggleModal"
      :reload-list="getList"
      :is-add="isAdd"
      :info="curOptInfo"
    />
    <Modal
      title="删除"
      field="showDelModal"
      :toggle-modal="toggleModal"
      :show="showDelModal"
      :sure="delApi"
    >
      <div>
        确认删除这个应用吗？
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import Head from "./Head.vue"
import List from "./ApplicationList.vue"
import InfoModal from "./InfoModal.vue"
import Api from "@api/application"
import Modal from "@component/modal/index.vue"
import { Info } from "./application"
import noticeFn from "@component/Toast/index"

@Component({
 components: {
        Head,
        List,
        InfoModal,
        Modal
    }
})
class Application extends Vue {
    list: anyObj[] = [];
    isAdd = true;
    showInfoModal = false;
    showDelModal = false;
    curOptIndex = -1;
    curOptInfo = this.initCurOptInfo([])

    mounted ():void{
     this.getList()
    }

    initCurOptInfo (list: anyObj[]):Info {
      const leg = list.length
      const sn = leg ? list[leg - 1].sn + 1 : 1

      return {
        name: "",
        code: "",
        remark: "",
       // oldCode: "",
        version: "",
        ip: "",
        homePage: "",
        sn
      }
    }

    getList (field?:"showDelModal" | "showInfoModal"):void {
      if (field) {
        this[field] = false
      }
      Api.getList().then((res) => {
        // this.list = res.data
       this.list = new Array(208).fill("").map((val, index) => {
          return Object.assign({}, res.data[0], { code: index + 1 + "" })
        })
      })
    }

    toggleModal (field:"showDelModal" | "showInfoModal", show:boolean):void {
      this[field] = show
      if (show) {
        const node = this.list[this.curOptIndex]
        if (this.curOptIndex > -1) {
          for (const key in this.curOptInfo) {
            this.curOptInfo[key as keyof Info] = node[key]
          }
          this.curOptInfo.oldCode = node.code
        } else {
          this.curOptInfo = this.initCurOptInfo(this.list)
        }
      }
    }

    modalOpenOpt (curOptIndex:number, field:"showDelModal" | "showInfoModal", isAdd:boolean):void {
      this.curOptIndex = curOptIndex
      this.toggleModal(field, true)
      this.isAdd = isAdd
    }

    delApi ():void {
      Api.delete(this.curOptInfo.code).then(() => {
          noticeFn.add("删除成功！")
          this.getList("showDelModal")
      })
    }
}

export default Application
</script>

<style lang="scss">
  .page-main {
    .inp-sn {
      width: 60px;
      height: 26px;
    }
  }
</style>
