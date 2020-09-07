<template>
  <header class="mainHead">
    <ul class="mainHeadUL">
      <li class="headline">
        <div>
          <span class="app-name">用户统一授权与认证子系统</span>
        </div>
      </li>
      <li class="userinfo">
        <div class="info-side">
          <div
            class="orgTxt"
            title="所处部门"
          >
            <i class="fa fa-org" />
            <span>{{ department }}</span>
          </div>
          <span class="septal-line" />
          <div
            class="roleTxt"
            title="所处角色"
          >
            <i class="fa fa-role" />
            <span>{{ role }}</span>
          </div>
          <span class="septal-line" />
          <div class="panelTxt">
            <div class="panel-btn">
              <a
                class="popup-panel"
                title="用户名"
              >
                <i class="fa fa-user" />
                <span>{{ user }}</span>
                <i
                  class="fa fa-arrow-bottom-line"
                  title="点击我"
                />
              </a>
            </div>
            <div
              class="user-panel panel-div"
            >
              <div class="menu-a">
                <a
                  class="user-item"
                  title="修改密码"
                ><i class="fa fa-key" /> 修改密码</a>
                <a
                  class="user-item"
                  title="退出系统"
                  @click="logOutEvent"
                ><i class="fa fa-power" /> 退出系统</a>
              </div>
              <Modal
                title="modal"
                field="showModal"
                :toggle-modal="modalOpt"
                :is-out="true"
                :show="showModal"
                :sure="logOut"
              >
                确定退出系统吗？
              </Modal>
            </div>
          </div>
        </div>
        <div class="j-home">
          <span class="fa fa-home" />
        </div>
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { fetchApi } from "@api/postData"
import { NOIDEA } from "../../global"
import Modal from "@component/modal/index.vue"
import { mapState } from 'vuex'
import { IStore } from "vue/types/vue"
import { Accessors } from "vue/types/options"
type computerType = {
    department:string;
    role: string;
    user: string;
  }
const HeadProps = Vue.extend<unknown, unknown, computerType, unknown>({
  components: {
    Modal
  },
  props: {
    appName: {
      type: String,
      default: "",
      required: true
    }
  },
  computed: mapState<computerType>({
    department: (state:IStore) => state.user.departmentName,
    role: (state:IStore) => state.user.level,
    user: (state:IStore) => state.user.code
  }) as Accessors<computerType>
})

@Component
export default class Head extends HeadProps {
  showModal = false
  logOutEvent ():void {
    this.showModal = true
  }

  modalOpt (filed: "showModal", isOpen:boolean):void {
      this[filed] = isOpen
  }

  logOut ():void {
    if (NOIDEA) { // 本地资源
        fetchApi.get("login/logOut")
        window.location.href = "/login.html"
    } else {
        window.location.href = "login/logOut"
    }
  }
}
</script>
<style lang="scss">
.mainHead {
  width: 100%;
  height: 60px;
  background-color: #fff;
  background-repeat: no-repeat;
  position: relative;
  border-bottom: 1px solid #eeeef3;

  .mainHeadUL,
  .mainHeadUL li,
  .mainHeadUL .info-side {
    height: 100%;
  }

  .mainHeadUL {
    display: flex;
  }

  .headline {
    line-height: 59px;

    .app-name,
    .app-describe {
      height: 100%;
      color: #393c40;
      font-family: "Microsoft YaHei";
      font-weight: normal;
    }

    .app-name {
      padding-left: 20px;
      font-size: 24px;
      letter-spacing: 6px;
    }

    .app-describe {
      font-size: 15px;
      letter-spacing: 4px;
    }
  }

  .userinfo {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .info-side {
      display: flex;
      align-items: center;

      span {
        font-size: 16px;
      }

      .orgTxt,
      .roleTxt,
      .panel-btn {
        line-height: 59px;
        color: #666;
      }

      .panelTxt {
        position: relative;

        &:hover {
          .panel-div {
            display: block;
          }
        }
      }

      .septal-line {
        height: 30px;
        border-left: 1px solid #ebebf2;
        padding-left: 16px;
        margin-left: 16px;
      }

      .panel-btn {
        a {
          color: #666;
          padding: 3px;
          cursor: pointer;
          transition: all 300ms ease-out;

          &:hover {
            color: #3b90f2;
          }
        }
      }

      .panel-div {
        min-width: 120px;
        text-align: center;
        display: none;
        padding: 8px 0;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 4px 24px #ccc;
        position: absolute;
        top: 50px;
        z-index: 1000;

        &.role-panel {
          left: 0;
        }

        &.user-panel {
          left: 0;
        }

        a {
          display: block;
          padding: 5px 12px;
          text-align: left;
          color: #666;
          font-size: 15px;
          cursor: pointer;
          border-bottom: 1px solid #ebebf2;

          &:hover,
          &.active {
            color: #276bce;
          }
        }
      }
    }
  }

  .j-home {
    cursor: pointer;
    color: white;
    background: #666;
    border-bottom-left-radius: 100%;
    height: 40px;
    position: relative;
    width: 40px;
    margin-left: 20px;

    .fa {
      position: absolute;
      top: 4px;
      font-size: 18px;
      right: 6px;
    }

    &:hover {
      background: lighten($color: #666, $amount: 20);
      opacity: 0.7;
    }
  }
}
</style>
