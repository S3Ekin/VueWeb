import { VNode } from "vue/types/umd"
export interface IListData<p> {
  listData: node<p>[];
  singleClickPre: string;
}

export type node<p> = anyObj<{
  active: p;
  expand?: boolean;
}>;
type treeNode<a, p extends string = "children"> = {
  [k in p]:treeNode<a, p>[];
} & anyObj<{
 active: a;
 expand?: boolean;
}>
export interface ISelected {
  id: string;
  text: string;
}

export interface comboMethods {
  click?: (id?: string) => void;
  getSelected: () => ISelected[];
}
export interface IDrop<c extends string = "children" > {
  tree: {
    childField: c;
    noSearch?: boolean;
    parAbleClick?: boolean;
  };
  list: unknown;
}

export type filedObj<P extends keyof IDrop, c extends string = "children"> = {
  idField: string;
  textField: string;
  multiply?: boolean;
  itemIcon?: string;
  defaultVal: string;
  field: string;
  clickOrCheckForbid?: <n>( // 巧妙的用了类型推断
    node: n,
    field: string,
    selectedArr: ISelected[]
  ) => boolean;
} & IDrop<c>[P];

export type drop<P extends keyof IDrop> = {
  filedObj: filedObj<P>;
  initComboVal?: { id: string };
  data: anyObj[];
  selected: ISelected[];
  dropStyle: { maxHeight: number };
  formatterDropItem?: (node: anyObj) => VNode;
  bindMethods:<k extends keyof comboMethods>(clickFn: comboMethods[k], k:k) => void; // 暴露点击方法，用于清除所选  巧妙的用了类型推断
  changeSelect(iselected: ISelected[], node?: anyObj): void;
  initSelect(iselected: ISelected[]): void;
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
