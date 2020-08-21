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
            :reg="/^[a-zA-Z]+$/"
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
        </div>
      </div>
      <div class="submit-box">
        <Button :handle="submit">
          保存
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Button from "@component/button/index.vue"
import SInp from "@component/input/index.vue"
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
        SInp
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

change (e:MouseEventEl<HTMLInputElement>):void {
    const name = e.target.name
    this.information[name as keyof data] = e.target.value
}

submit ():void{
    console.log(this.information)
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
