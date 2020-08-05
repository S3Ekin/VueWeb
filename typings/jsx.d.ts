/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue, { VNode } from 'vue'

declare global {
   namespace JSX {
     interface Element extends VNode {}
     interface ElementClass extends Vue {}
     interface ElementAttributesProperty {
       $props: {[key:string]: any}
     }
     interface IntrinsicElements {
        [elemName: string]: any
     }
   }
 }
