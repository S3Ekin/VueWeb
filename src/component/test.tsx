/**
 * @author: SEKin ;
 * @Date: 2020-08-05 10:45:36 ;
 * @description: TSX来写 ;
 * @Last Modified time: 2020-08-05 10:45:36 ;
 */
 import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Child extends Vue {
    @Prop(String) private value!: string;
    render ():Vue.VNode {
      return (
        <div>测试</div>
      )
    }
}
