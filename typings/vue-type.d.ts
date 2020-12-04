/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
declare module "vue/types/vue" {
  type routerItem = {
    fullPath: string;
    hash: string;
    matched: any[];
    meta: {[k:string]:unknown};
    name: string | undefined;
    params: {[k:string]:unknown};
    path: string;
    query: {[k:string]:unknown};
  }

 type routerNext = (routerItem?:routerItem)=>void
 export interface Vue {
   beforeCreate(): void;
   created(): void;
   beforeMount(): void;
   mounted(): void;
   beforeUpdate(): void;
   updated(): void;
   beforeDestroy(): void;
   destroyed(): void;

   // 路由钩子
   beforeRouteEnter (to:routerItem, from:routerItem, next:routerNext):void;
   beforeRouteUpdate(to:routerItem, from:routerItem, next:routerNext):void;
   beforeRouteLeave (to:routerItem, from:routerItem, next:routerNext):void;
 }

 export interface IStore {
   user:{
      id: string;
      code: string;
      name: string;
      roles: {
          kpi: string;
          index: string;
          portal: string;
          user: string;
      },
      level: string;
      email: string;
      departmentId: string;
      departmentName: string;
   },
   token:string
 }
}
