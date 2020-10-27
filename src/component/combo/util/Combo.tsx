import Vue from "vue"
import { VueClass } from "vue-class-component/lib/declarations"
import { Component, Prop, Provide } from "vue-property-decorator"
import { VueConstructor } from "vue/types/umd"
import { ISelected, filedObj } from "../Combobox"
import ComboInp from "./ComboInp.vue"

export default (Drop:VueClass<Vue>):VueConstructor<Vue> => {
  @Component({
    name: "Combo",
    components: {
        ComboInp,
        Drop
    }
  })
  class Combo extends Vue {
      @Prop(Array) data!: anyObj[];
      @Prop({ type: String, default: "id" }) idField!: string;
      @Prop({ type: String, default: "text" }) textField!: string;
      @Prop(Boolean) noicon?:boolean; // 没有下拉图标
      @Prop(Boolean) multiply?:boolean;
      @Prop({ type: String, default: "请选择..." }) tit!: string; // 提示语
      @Prop({ type: String, required: true }) field!: string;
      @Prop(String) itemIcon?: string; // 下拉框每行的图标，目录默认用文件夹
      @Prop(String) defaultVal?: string; // 默认选中的
      @Prop(Number) width?:number; // 显示框宽度
      @Prop(Number) maxHeight?:number;
      @Prop(Number) dropWidth?:number;
      @Prop(Boolean) directionUp?:boolean;// 下拉框在显示框上还是下
      @Prop(Boolean) noRequire?:boolean;
      @Prop(Boolean) ableClear?:boolean;
      // renderCallback?: boolean; //组件第一次加载调用点击事件的回调函数
      // 外部通过这个值来控制下拉框的选中,id可以是字符串分隔
      // initComboVal?:{id:string};
      // 点击或是选中之前做的操作，返回true不执行选中操作，默认返回false
      // clickOrCheckForbid?:(node:IImmutalbeMap<any>,field:string,selectedArr:states['selected'])=>boolean;
      // 自定义显示框的文字内容，selected所选择的内容
      // formatterVal?: (selected: states["selected"]) => React.ReactChild;
      // 自定义下拉框的文字内容
      // formatterDropItem?: (node:IImmutalbeMap<any>) => React.ReactChild;
      // 点击每行的回调函数
      // clickCallback(selected: ISelected[], field: string,node?:IImmutalbeMap<any>): void;

      drop = false;
      selected:ISelected[] = []
      @Provide() filedObj = this.initFileObj()

      initFileObj ():filedObj<"list"> {
          const { idField, textField, multiply, itemIcon, defaultVal, field } = this
          return {
              idField,
              textField,
              multiply,
              itemIcon,
              defaultVal,
              field
          }
      }

      dropToggle (e:MouseEventEl<HTMLDivElement>):void {
          const el = e.target!
          const drop = el.nextElementSibling! as HTMLDivElement
          if (!drop) {
            return
          }
          let dropH = 0
          if (!this.drop) {
            dropH = drop.firstElementChild!.clientHeight
          }
          drop.style.height = dropH + "px"
          this.drop = !this.drop
      }

      selectFn ():void {
          console.log(1)
      }

      get directionUpName () {
        return this.directionUp ? 'direction-up' : ''
      }

      render () {
        const { width, drop, tit, noicon, selectFn, dropToggle, ableClear, noRequire, selected, dropWidth, data } = this
        return (
          <div
            ref="wrapDomRef"
            class="g-combo"
            style={{ width: width || undefined }}
          >
            <ComboInp
              drop={drop}
              tit={tit}
              selected={selected}
              slideFn={dropToggle}
              noicon={noicon}
              ableClear={ableClear}
              noRequire={noRequire}
              clearFn={selectFn}
            />
            <div
              class={"m-drop " + this.directionUpName}
              style={{ height: "0px", width: dropWidth || undefined }}
            >
              <Drop
                data={data}
                selected={selected}
              />
            </div>
          </div>
        )
      }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Combo
}
