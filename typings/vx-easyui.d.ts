declare module "vx-easyui" {
    export interface TreeGrid extends Vue {
        uncheckRow(a?:{
            [k:string]:unknown
        }):void
        checkRow(a?:{
            [k:string]:unknown
        }):void
        getCheckedRows(a?:string):void
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export function install ():any
}
