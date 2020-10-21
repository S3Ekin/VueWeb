import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { CreateElement } from "vue/types/umd"
import { IColumnItem } from "./myTable"

@Component({
    name: "Column"
})
export default class Column extends Vue {
    @Prop({ required: true, type: String }) field!:string;
    @Prop(Number) width?:number;
    @Prop(Boolean) isRowSpanField?:boolean; // 是否为合并字段
    @Prop({ type: String, default: "center" }) align?:"center"|"left"|"right";
    @Prop() formatter?:(
        node: anyObj, // 节点
        index: number, // 节点索引
        tabField?: string // 表格标识
    ) => Vue.CreateElement;

    config: IColumnItem = this.getConfig();

    getConfig ():IColumnItem {
        const { width, isRowSpanField, align, formatter } = this
        return {
            field: "",
            width,
            isRowSpanField,
            align,
            formatter,
            name: ""
        }
    }

    render (h:CreateElement):anyObj {
        return h()
    }
}
