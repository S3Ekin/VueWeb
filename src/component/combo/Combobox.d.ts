import { VNode } from "vue/types/umd"
export interface IListData<p> {
  listData: node<p>[];
  singleClickPre: string;
}

export type node<p> = anyObj<{
  active: p;
  expand?: boolean;
}>;

export interface ISelected {
  id: string;
  text: string;
}

export interface comboMethods {
  click?: (path?: string) => void;
  getSelected: () => ISelected[];
}
export interface IDrop {
  tree: {
    childField?: string;
    noSearch?: boolean;
    parAbleClick?: boolean;
  };
  list: unknown;
}

export type filedObj<P extends keyof IDrop> = {
  idField: string;
  textField: string;
  multiply?: boolean;
  itemIcon?: string;
  defaultVal: string;
  field: string;
  clickOrCheckForbid?: (
    node: anyObj,
    field: string,
    selectedArr: ISelected[]
  ) => boolean;
} & IDrop[P];

export type drop<P extends keyof IDrop> = {
  filedObj: filedObj<P>;
  initComboVal?: { id: string };
  data: anyObj[];
  selected: ISelected[];
  dropStyle: { maxHeight: number };
  formatterDropItem?: (node: anyObj) => VNode;
  bindMethods:<k extends keyof comboMethods>(clickFn: comboMethods[k], k:k) => void; // 暴露点击方法，用于清除所选
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
