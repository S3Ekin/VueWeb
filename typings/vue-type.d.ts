/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
declare module "vue/types/vue" {
 export interface Vue {
   beforeCreate(): void;
   created(): void;
   beforeMount(): void;
   mounted(): void;
   beforeUpdate(): void;
   updated(): void;
   beforeDestroy(): void;
   destroyed(): void;
 }
}
