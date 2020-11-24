<template>
  <div class="page-main">
    <Table
      :data="list"
      :no-order="false"
      :checkbox="true"
      id-field="code"
    >
      <template v-slot:sn="{node,index}">
        <Column
          field="sn"
          name="排序"
          align="left"
        >
          <input
            v-if="node"
            type="number"
            :name="index"
            class="s-inp normal inp-sn"
            :value="node.sn"
            :data-sn="node.sn"
            @blur="changeSn"
          >
        </Column>
      </template>
      <template #default>
        <Column
          field="name"
          name="应用名称"
        />
        <Column
          field="code"
          name="code"
        />
        <Column
          field="version"
          name="版本号"
        />
      </template>
      <template v-slot:url="{node}">
        <Column
          field="url"
          name="URL"
        >
          <span v-if="node">
            {{ node.ip + "/" + node.homePage }}
          </span>
        </Column>
      </template>
      <template v-slot:opt="{index}">
        <Column
          field="opt"
          name="操作"
          :node-index="index"
        >
          <Button
            @click="editInfo"
          >
            修改
          </Button>
          <Button
            color-type="danger"
            @click="delConfirm"
          >
            删除
          </Button>
        </Column>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import Button from "@component/button/index.vue"
import Table from "@component/tableList/index.vue"
import Column from "@component/tableList/Column"
import { Info, modalOpt } from "./application"
import Api from "@api/application"
import noticeFn from "@component/Toast/index"

@Component({
 components: {
        Table,
        Button,
        Column
    }
})
class ApplicationList extends Vue {
    @Prop({ type: Function, required: true }) modalOpt!:modalOpt
    @Prop({ type: Function, required: true }) reloadList!:()=>void;
    @Prop({ required: true }) list!:anyObj[]

   editInfo (e:MouseEventEl<HTMLButtonElement>):void {
      const index = +e.target.parentElement!.dataset.index!
      this.modalOpt(index, "showInfoModal", false)
    }

    delConfirm (e:MouseEventEl<HTMLButtonElement>):void {
      const index = +e.target.parentElement!.dataset.index!
      this.modalOpt(index, "showDelModal", false)
    }

     changeSn (e:MouseEventEl<HTMLButtonElement>):void {
      const index = +e.target.name
      const val = e.target.value!
      const sn = e.target.dataset.sn
      if (sn === val) {
        return
      }
      const { name, homePage, code, ip, version, remark } = this.list[index] as Info
      Api.edit({
        sn: val,
        name,
        ip,
        version,
        code,
        remark,
        homePage,
        oldCode: code
      }).then(() => {
          noticeFn.add("排序成功！")
         this.reloadList()
      }).catch(() => {
         this.reloadList()
      })
    }
}

export default ApplicationList
</script>
