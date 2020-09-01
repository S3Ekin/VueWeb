<template>
  <div class="g-content">
    <div class="g-grid user-page">
      <div class="page-head">
        <span>搜索框组件</span>
        <div class="fr">
          <Button
            :handle="addUser"
            name="add"
            class-name="fa fa-add"
            border-type="line-btn"
            size="big"
          >
            新增
          </Button>
        </div>
      </div>
      <div
        class="page-main"
        style="width: 100%;"
      >
        <DataGrid
          :data="gridData"
          style="width: 100%;"
          :style="{height: gridHeight + 'px'}"
        >
          <GridColumn
            field="numOrder"
            title="行号"
            width="6%"
            align="center"
          >
            <template
              slot="body"
              slot-scope="scope"
            >
              <div class="item">
                {{ scope.rowIndex+1 }}
              </div>
            </template>
          </GridColumn>
          <GridColumn
            field="code"
            title="登录名"
            width="10%"
            align="center"
          />
          <GridColumn
            field="name"
            title="姓名"
            width="10%"
            align="center"
          />
          <GridColumn
            field="departmentName"
            title="部门"
            width="10%"
            align="center"
          />
          <GridColumn
            field="sex"
            title="姓别"
            width="10%"
            align="center"
          >
            <template
              slot="body"
              slot-scope="scope"
            >
              <span>
                {{ scope.row.sex === 'M' ? '男' : scope.row.sex === 'F'? '女' : '' }}
              </span>
            </template>
          </GridColumn>
          <GridColumn
            field="phone"
            title="手机"
            width="14%"
            align="center"
          />
          <GridColumn
            field="status"
            title="状态"
            width="10%"
            align="center"
          >
            <template
              slot="body"
              slot-scope="scope"
            >
              <SwitchButton
                input-id="s2"
                class="rounded"
                :value="scope.row.status === 'Y'"
              />
            </template>
          </GridColumn>
          <GridColumn
            field="operation"
            title="操作"
            width="30%"
            align="center"
          >
            <template
              slot="body"
              slot-scope="scope"
            >
              <div class="operate-btn">
                <div
                  v-for="(item, index) in gridBtns"
                  :key="item.url"
                  class="disIn"
                >
                  <a
                    class="border-box gridBtn"
                    :class="item.url==='delete'?'redTxt':'blueTxt'"
                    :title="item.name+'用户'"
                    :index="scope.rowIndex"
                    :name="item.url"
                    @click="clickBtn"
                  >{{ item.name }}</a>
                  <span
                    v-if="index != gridBtns.length-1"
                    class="septal-line"
                  >|</span>
                </div>
              </div>
            </template>
          </GridColumn>
        </DataGrid>
      </div>
    </div>
    <div>
      <DealModal
        ref="childDeal"
        :get-list="getList"
        :show="showDeal"
        :close="modalOpt"
        :deal-is-add-or-edit="dealIsAddOrEdit"
        :select-row="selectRow"
        :department-list="departmentList"
      />
    </div>
    <div>
      <AllotModal
        ref="childAllot"
        :roles-list="rolesList"
      />
    </div>
    <div>
      <Modal
        title="删除警告"
        field="deleteModal"
        :toggle-modal="modalOpt"
        :show="deleteModal"
        :sure="deleteUser"
      >
        <template>
          <div class="del-body">
            <div class="del-icon">
              <i class=" fa fa-question" />
            </div>
            <div>
              <div class="del-txt">
                确定删除该用户吗?
              </div>
              <div class="del-tip">
                点击确认后无法修改
              </div>
            </div>
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue"
import Component from "vue-class-component"
import Api from "@api/user"
import toastFn from "@component/Toast/index"
import Modal from "@component/modal/index.vue"
import Button from "@component/button/index.vue"
import SInp from "@component/input/index.vue"
import DealModal, { data } from "./dealModal.vue"
import AllotModal from "./allotModal.vue"

interface childDeal extends Vue {
  showModal(e:MouseEventEl<HTMLInputElement>):void;
}
  @Component({
      components: {
          Modal,
          Button,
          SInp,
          DealModal,
          AllotModal
      }
  })
  export default class User extends Vue {
    $refs!:{
      childDeal: childDeal
    }

    dealIsAddOrEdit = true
    showDeal = false
    gridData = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectRow: data | null = null;
    gridHeight = window.innerHeight - 155;
    gridBtns = [
      { name: '修改', url: 'edit' },
      { name: '授权', url: 'allot' },
      { name: '删除', url: 'delete' }
    ];

    departmentList = [];
    deleteModal = false;
    rolesList = [];

    created ():void{
      this.getList()
      Api.departmentList().then(res => {
        this.departmentList = res.data
      })
      Api.rolesList().then(res => {
        const data = res.data
        data.map((item: { id: unknown; code: unknown; type: number; children: unknown; roleList: unknown }) => {
            item.id = item.code
            item.type = 1
            item.children = item.roleList
        })
        this.rolesList = Object.freeze(data)
      })
    }

    getList ():void {
      Api.list().then(res => {
        this.gridData = Object.freeze(res.data)
      })
    }

    // 新增
    addUser ():void{
      this.dealIsAddOrEdit = true
      this.showDeal = true
    }

    // 修改
    editUser ():void{
      this.dealIsAddOrEdit = false
      this.showDeal = true
    }

    // 授权
    allotUser ():void{
      this.$refs.childAllot.showModal()
    }

    // 删除
    deleteUser ():void{
      Api.deleteUser({ id: this.selectRow.id }).then(() => {
        toastFn.add(`删除用户成功！`)
        this.deleteModal = false
        this.getList()
      })
    }

    modalOpt (filed: "deleteModal" | "showDeal", isOpen:boolean):void {
      this[filed] = isOpen
    }

    // grid里的按钮
    clickBtn (e:MouseEventEl<HTMLInputElement>):void{
      const sta = e.target.name
      const index = e.target.getAttribute('index')
      this.selectRow = this.gridData[index]
      if (sta === 'edit') {
        this.editUser()
      } else if (sta === 'allot') {
        this.allotUser()
      } else if (sta === 'delete') {
        this.deleteModal = true
      }
    }
  }
</script>
<style lang="scss">
@import "../../css/common/EasyChange";

.inp-item {
  margin: 0;
}
</style>
