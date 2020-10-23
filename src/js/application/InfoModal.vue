<template>
  <Modal
    class-name="info-modal"
    :title="isAdd ? '新增' : '修改'"
    field="showInfoModal"
    :toggle-modal="toggleModal"
    :show="show"
    :sure="addOrEditApi"
  >
    <div class="flex-between box">
      <div>
        <SInp
          :val="data.code"
          name="code"
          :vertical="true"
          :handle="changeInfo"
        >
          code：
        </SInp>
        <SInp
          :val="data.name"
          name="name"
          :vertical="true"
          :handle="changeInfo"
        >
          名称：
        </SInp>
        <SInp
          :val="data.ip"
          name="ip"
          :vertical="true"
          :handle="changeInfo"
        >
          ip：
        </SInp>
      </div>
      <div>
        <SInp
          :val="data.homePage"
          name="homePage"
          :vertical="true"
          :handle="changeInfo"
        >
          homePage：
        </SInp>
        <SInp
          :val="data.version"
          name="version"
          :vertical="true"
          :handle="changeInfo"
        >
          版本：
        </SInp>
        <SInp
          :val="data.remark"
          name="remark"
          :vertical="true"
          :handle="changeInfo"
          :is-text-area="true"
          :no-required="true"
        >
          remark：
        </SInp>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import Modal from "@component/modal/index.vue"
import SInp from "@component/input/index.vue"
import noticeFn from "@component/Toast/index"
import { Info } from "./application"
import Api from "@api/application"

@Component({
 components: {
        Modal,
        SInp
    }
})
class Application extends Vue {
    @Prop({ type: Function, required: true }) toggleModal!:()=>void;
    @Prop({ type: Function, required: true }) reloadList!:(field?:"showDelModal" | "showInfoModal")=>void;
    @Prop({ type: Object, required: true }) info!: Info;
    @Prop({ required: true }) show!: boolean;
    @Prop({ required: true }) isAdd!: boolean;
    data = this.info;

    @Watch("info")
    updateData ():void {
      this.data = this.info
    }

    addOrEditApi ():void {
      if (this.isAdd) {
        Api.add(this.data).then(() => {
          noticeFn.add("新增成功！")
          this.reloadList("showInfoModal")
        })
      } else {
       Api.edit(this.data).then(() => {
          noticeFn.add("修改成功！", "success", true)
          this.reloadList("showInfoModal")
        })
      }
    }

    changeInfo (e:MouseEventEl<HTMLInputElement>) :void {
      const el = e.target!
      const field = el.name as keyof Info
      const val = el.value.trim()
      this.data[field] = val
    }
}

export default Application
</script>

<style lang="scss">
  .info-modal {
    .box {
      width: 600px;

      & > div {
        width: 49%;
      }
    }
  }
</style>
