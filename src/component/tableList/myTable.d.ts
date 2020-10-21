
export interface IColumnItem {
    field:string;
    name: string;
    width?:number;
    isRowSpanField?:boolean;// 是否为合并字段
    align?:"center"|"left"|"right";
    formatter?:(
        node: anyObj, // 节点
        index: number, // 节点索引
        tabField?: string // 表格标识
    ) => Vue.CreateElement;
}

export type fieldObj = {
    column: IColumnItem[]; // 列头定义
    idField: string; // 表格的节点标识
    noOrder?: boolean; // 序号
    checkbox?: boolean; // 多选
    tabField?: string; // 表格标识
    noPageNums?:boolean;// 页码
};

export interface ITableStates {
    perNums: number; // 每页条数
    curPage: number; // 当前页数
    tableData: anyObj[];
    preData:anyObj[];
    preInitSelectVal?:{id:string};
}
export interface ITableFn {
    changeState<P extends keyof ITableStates>(
        field: P,
        data: ITableStates[P]
    ): void;
}
