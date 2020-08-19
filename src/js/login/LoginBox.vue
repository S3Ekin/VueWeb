<template>
  <div class="m-login">
    <div class="login-title">
      请登录
    </div>
    <div class="login-inpBox">
      <div class="login-inp">
        <label class="g-inp-lab g-inp">
          <span class="lab-tit"><i class="fa fa-user-login" /></span>
          <input
            v-model="userName"
            class="s-inp normal "
            name="userName"
            type="text"
            placeholder="用户名"
            autocomplete="off"
            @keydown="login"
          >

        </label>
      </div>
      <div class="login-inp">
        <label class="g-inp-lab g-inp">
          <span class="lab-tit"><i class="fa fa-password-login" /></span>
          <input
            v-model="password"
            class="s-inp normal "
            name="password"
            type="password"
            placeholder="登录密码"
            autocomplete="off"
            @keydown="login"
          >

        </label>
      </div>
    </div>
    <div class="submit-btn">
      <button
        class="s-btn normal-btn login-btn primary"
        @click="login"
      >
        登 录
      </button>

      <div v-show="!!warnTxt">
        <div class="m-warn">
          <i class="fa fa-warning" />{{ warnTxt }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { ROOTSRC, NOIDEA } from "../../global"
import { fetchApi } from "@api/postData"
@Component
export default class Login extends Vue {
    userName= ""
    password=""
    warnTxt = ""
    login ():void {
        console.log(this.userName)
        if (!this.userName || !this.password) {
            this.warnTxt = "请输入用户名或密码！"
            return
        }
        this.warnTxt = ""
        const psd = window.hex_md5(window.hex_md5(this.password))
        fetchApi.postJson(`login/loginValue`, {
            code: this.userName,
            password: psd
        }).then(() => {
               const url = NOIDEA ? "/" : ROOTSRC
               const fileType = NOIDEA ? ".html" : ""
                window.location.href = url + "index" + fileType
        }).catch((err) => {
             this.warnTxt = err.msg
        })
    }
}
</script>

<style lang="scss">
.test {
  background: red;
}
</style>
