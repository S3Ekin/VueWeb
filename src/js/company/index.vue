<template>
  <div class="g-content">
    <div class="g-article hospital-page">
      <div class="flex-between">
        <div>
          <SInp
            :val="information.name"
            :name="'name'"
            :handle="change"
          >
            名称：
          </SInp>
          <SInp
            :val="information.enName"
            name="enName"
            :handle="change"
            reg-tip="必须为英文字母"
            :reg="/^[a-zA-Z ]+$/"
          >
            英文名称：
          </SInp>
          <SInp
            :val="information.phone"
            :name="'phone'"
            :handle="change"
          >
            电话：
          </SInp>
          <SInp
            :val="information.address"
            :name="'address'"
            :handle="change"
          >
            地址：
          </SInp>
          <div class="inp-item">
            <Checkbox
              :handle="change"
              :select="logoType"
              name="logo"
              :data="logoCheckboxArr"
            >
              LOGO图片：
            </Checkbox>
          </div>
          <div class="logo-box">
            <div
              v-if="logoType==='Y'"
              class="logo-item"
            >
              <div id="default-logo" />
            </div>
            <div
              v-else
              class="logo-item"
            >
              <div>
                <UpFile
                  :handle="upFile"
                  name="logo"
                  :file-reg="/(png)|(jpg)/"
                >
                  logo上传
                </UpFile>
              </div>
              <div
                class="customer-box"
              >
                <img
                  v-if="information.logo"
                  id="customer-img"
                  :src="information.logo"
                  alt="logo"
                >
              </div>
            </div>
          </div>
        </div>
        <div>
          <SInp
            :val="information.city"
            name="city"
            :handle="change"
          >
            城市：
          </SInp>
          <SInp
            :val="information.email"
            name="email"
            :handle="change"
          >
            邮箱：
          </SInp>
          <SInp
            :val="information.code"
            name="code"
            :handle="change"
          >
            简称：
          </SInp>
          <SInp
            :val="information.website"
            name="website"
            :no-required="true"
            :handle="change"
          >
            官网：
          </SInp>
          <SInp
            :val="information.remark"
            name="remark"
            row="4"
            is-text-area
            :handle="change"
            :no-required="true"
          >
            描述：
          </SInp>
        </div>
      </div>
      <div class="submit-box">
        <Button
          :handle="submit"
          size="big"
        >
          保存
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import Button from "@component/button/index.vue"
import SInp from "@component/input/index.vue"
import Checkbox from "@component/checkbox/index.vue"
import UpFile from "@component/upfileBox/index.vue"
import { fetchApi } from "@api/postData"
import noticeFn from "@component/Toast/index"
type data = {
    name: string;
    enName: string;
    phone: string;
    address: string;
    email: string;
    website: string;
    remark: string;
    logo: string;
    city: string;
    status: string;
    code: string;
}
@Component({
    components: {
        Button,
        SInp,
        Checkbox,
        UpFile
    }
})

export default class Company extends Vue {
information:data={
    name: '',
    enName: '',
    phone: '',
    address: '',
    email: '',
    website: '',
    remark: '',
    logo: '',
    city: '',
    status: '',
    code: ''
}

logoType = "Y"

logoCheckboxArr = [
  { name: "默认", val: "Y" },
  { name: "自定义图片", val: "N" }
  ]

mounted ():void {
  fetchApi.get("company/list").then(res => {
    this.information = res.data
    this.logoType = res.data.logo ? "N" : "Y"
  })
}

change (e:MouseEventEl<HTMLInputElement>):void {
    const name = e.target.name
    if (name !== "logo") {
      this.information[name as keyof data] = e.target.value
    } else {
      this.logoType = e.target.value
      this.information.logo = ""
    }
}

upFile (e:MouseEventEl<HTMLInputElement>):void {
  const file = e.target.files![0]
  const read = new FileReader()
  read.onload = (e) => {
    const base64 = e.target!.result as string
    this.information.logo = base64
  }
  read.readAsDataURL(file)
}

submit ():void{
  fetchApi.postJson("company/edit", this.information).then(() => {
      noticeFn.add("信息修改成功！")
  })
}
}
</script>
<style lang="scss">
.hospital-page {
  $wid:400px;

  .lab-tit {
    width: 114px;
  }

  .s-inp {
    width: 400px;
  }

  .lab-tip-box {
    left: 114px;
  }

  .s-txt {
    width: $wid;
  }

  .submit-box {
    text-align: center;
    padding-top: 50px;
    margin-top: 20px;
    border-top: 2px solid #e1e5f0;

    .s-btn {
      height: 3em;
    }
  }

  .logo-box {
    padding-left: 114px;
  }

  #default-logo {
    background: url(../../assert/imgs/app_logo.svg) center no-repeat #5576aa;
    background-size: 65%;
    width: 250px;
    height: 70px;
  }

  .customer-box {
    margin-top: 34px;
    width: 300px;
    height: 70px;
    background: #5576aa;
    display: flex;
    justify-content: center;
    align-items: center;

    &:empty {
      &::before {
        content: "请选择图片！";
        color: white;
        font-size: 16px;
      }
    }
  }

  #customer-img {
    width: 65%;
    height: 65%;
  }
}
</style>
