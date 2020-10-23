<template>
  <div class="g-content">
    <div class="g-grid">
      <div class="page-head">
        <Search
          :handle="search"
          :width="400"
        />
        <Button
          :handle="add"
          class-name="fa fa-add"
        >
          新增
        </Button>
      </div>
      <div class="page-main">
        <Table
          :data="list"
          :no-order="true"
          id-field="code"
        >
          <template #default>
            <Column
              field="sn"
              name="排序"
            />
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
          <template v-slot:url="node">
            <Column
              field="url"
              name="URL"
            >
              {{ node.ip + "/" + node.homePage }}
            </Column>
          </template>
          <template v-slot:opt>
            <Column
              field="opt"
              name="操作"
            >
              <Button :handle="add">
                新增
              </Button>
              <Button :handle="add">
                删除
              </Button>
            </Column>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue"
import { Component } from "vue-property-decorator"
import Search from "@component/search/index.vue"
import Button from "@component/button/index.vue"
import Table from "@component/tableList/index.vue"
import Column from "@component/tableList/Column"
import Api from "@api/application"

@Component({
 components: {
        Search,
        Button,
        Table,
        Column
    }
})
class Application extends Vue {
    list: anyObj[] = [];
    formatterFnObj = {
      url: (node:anyObj): VNode => {
        return this.$createElement("span", node.ip)
      },
      opt: ():VNode => {
        return this.$createElement(Button, {
          props: {
            handle: function () {
              console.log(1212)
            }
        }
      }, "12")
      }

    }

    mounted ():void{
      Api.getList().then(res => {
        this.list = res.data
      })
    }

    search ():void {
      console.log(1)
    }

    add ():void {
      console.log(2)
    }
}

export default Application
</script>

<style lang="scss">
  .test {
    background: red;
  }
</style>
