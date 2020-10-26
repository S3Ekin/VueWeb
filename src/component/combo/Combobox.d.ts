import { VNode } from "vue/types/umd"


export interface ISelected {
        id:string;
        text:string;
    }

    export interface IDrop {
        tree:{
             childField?:string;
             noSearch?:boolean;
             parAbleClick?:boolean;
        };
        list:{};
    }

   export type filedObj<P extends keyof IDrop> = {
        idField: string;
        textField: string;
        multiply?: boolean;
        itemIcon?: string;
        defaultVal?: string;
        field:string;
        clickOrCheckForbid:(node:anyObj,field:string,selectedArr?:ISelected[])=>boolean;
    } & IDrop[P];

    export type drop<P extends keyof IDrop> = {
        filedObj: filedObj<P>;
        initComboVal?:{id:string};
        data:anyObj[];
        selected:ISelected[];
        dropStyle:{maxHeight:number};
        formatterDropItem?:(node:anyObj)=>VNode;
        clickMethod:(clickFn:(path?:string)=>void)=>void; // 暴露点击方法，用于清除所选
        changeSelect(iselected:ISelected[], node?:anyObj):void;
        initSelect(iselected:ISelected[]):void;
    };

    export interface ICheckboxCom {
        changeHandle: (e: MouseEventEl<HTMLInputElement>) => void;
        checked: boolean;
        value?: string;
        name?: string;
        hasChecked?: boolean;
        type?: "checkbox" | "radio";
        isControl?: boolean;
    }