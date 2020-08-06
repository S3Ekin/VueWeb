/**
 * @author: SEKin ;
 * @Date: 2020-08-05 10:45:36 ;
 * @description: TSX来写 ;
 * @Last Modified time: 2020-08-05 10:45:36 ;
 */
import Vue, { VNode } from "vue"
import Component from "vue-class-component"

 @Component
 class TSXCom extends Vue {
   test = "SEkn";

   render ():VNode {
     return (
         <div>
             {this.test}
         </div>
     )
   }
}
export default TSXCom
