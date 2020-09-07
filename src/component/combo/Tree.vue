<template>
  <div class="m-par">
    <div
      class="m-item"
      :data-path="path"
      @click="toggle"
    >
      <span
        class="m-text"
        :style="{paddingLeft: lev * 20 + 'px'}"
      >
        {{ node[filedObj.text] }}-par-{{ foo }}
      </span>
    </div>
    <div class="m-child-list">
      <ul>
        <li
          v-for="(item , index) in child"
          :key="item[filedObj.id]"
        >
          <TreePar
            v-if="item[filedObj.child].length"
            :filed-obj="filedObj"
            :node="item"
            :path="path + '-' + index"
            :lev="lev + 1"
          />
          <div
            v-else
            class="m-item"
            :data-path="path + '-' + index"
            :style="{paddingLeft: (lev+1)*20 + 'px'}"
          >
            {{ item[filedObj.text] }}-child
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue"
import Component from "vue-class-component"
const treeProps = Vue.extend({
    props: {
        filedObj: {
            type: Object as PropType<{
                id: string;
                text: string;
                child: string;
            }>,
            default: {
                id: "id",
                text: "text",
                child: "children"
            }
        },
        node: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: Object as PropType<{[k:string]:any}>,
            default: []
        },
        path: {
            type: String,
            required: true
        },
        lev: {
            type: Number,
            required: true
        }
    }
})
@Component({
    name: "TreePar",
    inject: ["foo"]
})
export default class Tree extends treeProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get child (): any[] {
        const { node, filedObj: { child } } = this
        return node[child]
    }

    mounted ():void{
        console.log(1)
    }

    toggle ():void{
        console.log(12)
    }
}
</script>

<style lang="scss">
  .g-tree {
    background: red;
  }

  .m-item {
    padding: 6px 0;
  }
</style>
