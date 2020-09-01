<template>
  <Modal
    :title="dealModalTitle"
    field="showDeal"
    :toggle-modal="close"
    :show="show"
    :sure="sure"
  >
    <template v-slot:default="">
      <div
        class="m-main"
        :style="{maxHeight: modalHeight + 'px'}"
      >
        <div class="m-group">
          <p class="m-g-title">
            登录信息
          </p>
          <div class="m-g-row">
            <SInp
              :name="'code'"
              :val="rowData.code"
              :vertical="true"
              :no-required="false"
              :handle="change"
            >
              用户名：
            </SInp>
          </div>
          <div class="m-g-row">
            <div class="m-g-r-slicing">
              <SInp
                :val-type="'password'"
                :name="'loginPwd'"
                :val="rowData.loginPwd"
                :vertical="true"
                :no-required="rowSta == 'edit'"
                :handle="change"
              >
                登录密码：
              </SInp>
            </div>
            <div class="m-g-r-slicing">
              <SInp
                :val-type="'password'"
                :name="'truePwd'"
                :val="rowData.truePwd"
                :vertical="true"
                :no-required="rowSta == 'edit'"
                :handle="change"
              >
                确认密码：
              </SInp>
            </div>
          </div>
        </div>
        <div class="m-group">
          <p class="m-g-title">
            基本信息
          </p>
          <div class="m-g-row">
            <div class="m-g-r-slicing">
              <SInp
                :name="'name'"
                :val="rowData.name"
                :vertical="true"
                :no-required="false"
                :handle="change"
              >
                真实姓名：
              </SInp>
            </div>
            <div class="m-g-r-slicing">
              <div class="inp-item">
                <Label
                  align="top"
                  style="height: 23px; line-height: 23px;"
                >性别：</Label>
                <ComboBox
                  v-model="rowData.sex"
                  style="height: 36px;"
                  :name="'sex'"
                  :editable="false"
                  :placeholder="'请选择性别'"
                  :data="sexList"
                />
              </div>
            </div>
          </div>
          <div class="m-g-row">
            <div class="m-g-r-slicing">
              <SInp
                :name="'phone'"
                :val="rowData.phone"
                :vertical="true"
                :no-required="false"
                :handle="change"
              >
                手机号码：
              </SInp>
            </div>
            <div class="m-g-r-slicing">
              <SInp
                :name="'email'"
                :val-type="'email'"
                :val="rowData.email"
                :vertical="true"
                :reg="/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/"
                reg-tip="必须为正确邮箱地址"
                :handle="change"
              >
                联系邮箱：
              </SInp>
            </div>
          </div>
          <div class="m-g-row">
            <div class="m-g-r-slicing">
              <div class="inp-item">
                <Label
                  align="top"
                  style="height: 23px; line-height: 23px;"
                >所在部门：</Label>
                <ComboBox
                  v-model="rowData.departmentId"
                  style="height: 36px;"
                  :value-field="'id'"
                  :text-field="'name'"
                  :editable="false"
                  :placeholder="'请选择所在部门'"
                  :invalid="!rowData.departmentId"
                  :data="departmentList"
                />
              </div>
            </div>
            <div class="m-g-r-slicing">
              <SInp
                :name="'position'"
                :val="rowData.position"
                :vertical="true"
                :handle="change"
              >
                职位：
              </SInp>
            </div>
          </div>
          <div class="m-g-row">
            <SInp
              :name="'remark'"
              is-text-area
              :val="rowData.remark"
              :vertical="true"
              :handle="change"
            >
              备注信息：
            </SInp>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang='ts'>
import Vue, { PropType } from "vue"
import Component from "vue-class-component"
import Modal from "@component/modal/index.vue"
import SInp from "@component/input/index.vue"
import toastFn from "@component/Toast/index"
import { hexMd5 } from "@assert/js/md5.js"
import Api from "@api/user"
export type data = {
    id: string,
    code: string,
    name: string,
    loginPwd: string,
    truePwd: string,
    password: string,
    sex: string,
    email: string,
    status: string,
    remark: string,
    departmentId: string,
    departmentName: string,
    position: string,
    phone: string,
};

const ModalProps = Vue.extend({
    name: "DealModal",
    components: {
      Modal,
      SInp
    },
    props: {
      departmentList: {
        type: Array,
        default: null
      },
      // 页面的列表请求
      getList: {
        type: Function as PropType<()=>void>,
        required: true
      },
      // 模态框显示
      show: Boolean,
      // 模态框关闭
      close: {
        type: Function as PropType<(file:string, statusd:boolean)=>void>,
        required: true
      },
      // 判断是新增true还是修改false
      dealIsAddOrEdit: Boolean,
      selectRow: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: Object as PropType<data>,
        default: null
      }
    },
    watch: {
      show: function (val) {
        val && (this as DealModal).showModal()
      }
    }
})

@Component
export default class DealModal extends ModalProps {
  rowData!:data;
  // rowData:data = {
  //       id: '',
  //       code: '',
  //       name: '',
  //       loginPwd: '',
  //       truePwd: '',
  //       password: '',
  //       sex: '',
  //       email: '',
  //       status: 'Y',
  //       remark: '',
  //       departmentId: '',
  //       departmentName: '',
  //       position: '',
  //       phone: ''
  //     }

  rowSta = ''
  sexList = [
    { value: 'M', text: '男' },
    { value: 'F', text: '女' }
  ]

  dealModalTitle = '';
  modalHeight = window.innerHeight - 240;

  showModal ():void{
    if (this.dealIsAddOrEdit) {
      this.dealModalTitle = '新增用户'
      this.rowData = {
        id: '',
        code: '',
        name: '',
        loginPwd: '',
        truePwd: '',
        password: '',
        sex: '',
        email: '',
        status: 'Y',
        remark: '',
        departmentId: '',
        departmentName: '',
        position: '',
        phone: ''
      }
    } else {
      this.dealModalTitle = '修改用户'
      this.rowData = Object.assign({}, this.selectRow)
    }
  }

  change (e:MouseEventEl<HTMLInputElement>):void {
    const name = e.target.name
    const value = e.target.value
    this.rowData[name as keyof data] = value
  }

  sure ():void {
    const { id, code, name, loginPwd, truePwd, sex, phone, email, departmentId, position, remark, status } = this.rowData
    let url = ''
    let hitTxt = ''
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const submitData: any = {
        code,
        name,
        sex,
        phone,
        email,
        departmentId,
        position,
        remark,
        status,
        password: ''
    }
    if (!code || !name || !phone || !departmentId) {
      toastFn.add("请将必填项填写完整！", "warn")
      return
    }
    if (this.dealIsAddOrEdit) {
      if (!loginPwd || !truePwd) {
        toastFn.add('密码不能为空！', 'warn')
        return
      } else {
        if (loginPwd !== truePwd) {
          toastFn.add('两次输入的密码不一致！', 'warn')
          return
        }
        if (truePwd.length < 6 || truePwd.length > 20) {
          toastFn.add('密码长度应在6~20个字符之间！', 'warn')
          return
        }
        submitData.password = hexMd5(hexMd5(truePwd))
      }
      url = 'add'
      hitTxt = '新增用户'
    } else {
      if (loginPwd || truePwd) {
        if (loginPwd !== truePwd) {
          toastFn.add('两次输入的密码不一致！', 'warn')
          return
        }
        if (truePwd.length < 6 || truePwd.length > 20) {
          toastFn.add('密码长度应在6~20个字符之间！', 'warn')
          return
        }
        submitData.password = hexMd5(hexMd5(truePwd))
      } else {
        submitData.password = ''
      }
      submitData.id = id
      url = 'edit'
      hitTxt = '修改用户'
    }
    // AJAX
    Api.dealUser(url, submitData).then(() => {
      toastFn.add(`${hitTxt}成功！`)
      this.close('showDeal', false)
      this.getList()
    })
  }
}
</script>
<style lang="scss">
.m-main {
  width: 430px;
  overflow: auto;
}

.m-group {
  margin-bottom: 10px;

  .m-g-title {
    color: #707070;
    padding-bottom: 5px;
    font-size: 14px;
    font-weight: 700;
  }

  .m-g-row {
    padding-bottom: 10px;

    .s-inp,
    .s-txt {
      width: 400px;
    }

    .m-g-r-slicing {
      display: inline-block;
      vertical-align: middle;

      .s-inp {
        width: 193px;
      }

      .textbox {
        width: 193px;
      }
    }

    .inp-item {
      padding: 0 5px;

      .lab-tit {
        font-size: 14px;
        margin-bottom: 5px;
      }

      .lab-tip-box {
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
