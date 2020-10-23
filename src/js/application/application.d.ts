export type modalOpt = (curOptIndex:number, field:"showDelModal" | "showInfoModal", isAdd:boolean)=> void
export type Info = {
    name: string;
    code: string;
    remark: string;
    oldCode?: string;
    version: string;
    ip: string;
    homePage: string;
    sn: string;
}
