import Vue from "vue"
import { VueClass } from "vue-class-component/lib/declarations"
import { Component, Prop, Provide } from "vue-property-decorator"
import { VueConstructor } from "vue/types/umd"
import { ISelected, filedObj, comboMethods, IDrop } from "../Combobox"
import ComboInp from "./ComboInp.vue"
import { closertPar } from "@component/domUtil/util"
import { event } from "./util"

const slideOther = (excludekey?:string) => {
  const activeCom = document.querySelector(".m-drop.active") as HTMLDivElement
  if (!activeCom) {
    return
  }
  const k = activeCom.dataset.event!
  if (excludekey && excludekey === k) {
    return
  }
  event.emit(k, activeCom)
}
document.body.addEventListener("click", function () {
  slideOther()
})
type comboType = keyof IDrop
export default function Hqc (Drop:VueClass<Vue>):VueConstructor<Vue> {
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
      @Prop({ type: String, default: "children" }) childField!: string;
      @Prop(Boolean) noicon?:boolean; // 没有下拉图标
      @Prop(Boolean) multiply?:boolean;
      @Prop({ type: String, default: "请选择..." }) tit!: string; // 提示语
      @Prop({ type: String, required: true }) field!: string;
      @Prop({ type: String, default: "fa-cricle" }) itemIcon?: string; // 下拉框每行的图标，目录默认用文件夹
      @Prop({ type: String, default: "" }) defaultVal!: string; // 默认选中的
      @Prop(Number) width?:number; // 显示框宽度
      @Prop({ type: Number, default: 300 }) maxHeight!:number;
      @Prop(Number) dropWidth?:number;
      @Prop(Boolean) directionUp?:boolean;// 下拉框在显示框上还是下
      @Prop(Boolean) noRequire?:boolean;
      @Prop(Boolean) noSearch?:boolean;
      @Prop(Boolean) parAbleClick?:boolean;
      @Prop(Boolean) ableClear?:boolean;
      @Prop(Boolean) renderCallback?: boolean; // 组件第一次加载调用点击事件的回调函数
      @Prop(Function) bindComMethods?: (exportMethods:comboMethods)=> void;
      @Prop(Object) initComboVal?:{id:string}; // 外部通过这个值来控制下拉框的选中,id可以是字符串分隔
      // 点击或是选中之前做的操作，返回true不执行选中操作，默认返回false
      @Prop(Function) clickOrCheckForbid?:<n>(node:n, field:string, selectedArr:ISelected[])=>boolean;
      // 自定义显示框的文字内容，selected所选择的内容
      // formatterVal?: (selected: states["selected"]) => React.ReactChild;
      // 自定义下拉框的文字内容
      // formatterDropItem?: (node:IImmutalbeMap<any>) => React.ReactChild;
      // 点击每行的回调函数
      @Prop(Function) clickCallback?: (selected: ISelected[], field: string, node?:anyObj)=> void;

      eventKey = new Date().getTime()
      drop = false;
      selected:ISelected[] = []
      @Provide() filedObj = this.initFileObj()
      get directionUpName () {
        return this.directionUp ? 'direction-up' : 'direction-down'
      }

      created ():void {
        if (this.bindComMethods) {
          this.bindComMethods(this.exportMethods)
        }
      }

      mounted () {
        const k = this.eventKey + ""
        event.on(k, this.slideUp)
      }

      destroyed ():void {
        const k = this.eventKey + ""
        event.remove(k)
      }

      clickBox (e:Event):void {
        e.stopPropagation()
      }

      // 暴露给外面的方法
      exportMethods:comboMethods = {
        getSelected: this.getSelected // 要是直接在这写返回函数是不会把 selected 的值动态返回出去，只会返回初始值，但是正常返回了this的上下文Combo,
      }

      slideUp (drop:HTMLElement):void {
        this.slideDrop(drop, false)
      }

      slideDrop (dropEl:HTMLElement, drop: boolean):void {
         let dropH = 0
          if (drop) {
            dropH = dropEl.firstElementChild!.clientHeight
          }
          dropEl.style.height = dropH + "px"
          this.drop = drop
      }

      getSelected (): ISelected[] {
          return this.selected.map(val => val)
      }

      bindFn<k extends keyof comboMethods> (fn: comboMethods[k], key: k):void {
          this.exportMethods[key] = fn
      }

      initFileObj ():filedObj<comboType, string> {
          const { idField, textField, multiply, itemIcon, defaultVal, field, clickOrCheckForbid, childField, noSearch, parAbleClick } = this
          if (Drop.name === "ComboTree") {
            return {
                idField,
                textField,
                multiply,
                itemIcon: "fa-file",
                defaultVal,
                field,
                childField,
                clickOrCheckForbid,
                noSearch,
                parAbleClick
            } as filedObj<"tree", string>
          } else {
            return {
              idField,
              textField,
              multiply,
              itemIcon,
              defaultVal,
              field,
              clickOrCheckForbid
            }
          }
      }

      dropToggle (e:MouseEventEl<HTMLDivElement>):void {
          const el = closertPar(e.target!, "m-combo-inp")
          const drop = el.nextElementSibling! as HTMLDivElement
          if (!drop) {
            return
          }
          const k = drop.dataset.event
          slideOther(k)
          this.slideDrop(drop, !this.drop)
      }

      changeSelect (selected:ISelected[], node?: anyObj):void{
         const { clickCallback, field } = this
          this.selected = selected
          clickCallback && clickCallback(selected, field, node)
      }

      initSelect (selected:ISelected[]):void {
            const { renderCallback } = this
            this.selected = selected
            if (renderCallback && this.clickCallback) {
              const { field, clickCallback } = this
              clickCallback(selected, field)
            }
      }

      render () {
        const { width, initComboVal, drop, tit, noicon, changeSelect, eventKey, dropToggle, ableClear, noRequire, selected, dropWidth, data, exportMethods } = this
        const activeName = drop ? " active" : ""
        return (
          <div
            class="g-combo"
            style={{ width: width ? width + "px" : undefined }}
            onClick={this.clickBox}
          >
            <ComboInp
              drop={drop}
              tit={tit}
              selected={selected}
              slideFn={dropToggle}
              noicon={noicon}
              ableClear={ableClear}
              noRequire={noRequire}
              clearFn={exportMethods.click}
            />
            <div
              class={"m-drop " + this.directionUpName + activeName}
              data-event={eventKey}
              style={{ height: "0px", width: dropWidth ? dropWidth + "px" : undefined }}
            >
              <Drop
                data={data}
                initSelect={this.initSelect}
                initComboVal={initComboVal}
                selected={selected}
                changeSelect={changeSelect}
                bindMethod={this.bindFn}
                maxHeight={this.maxHeight}
              />
            </div>
          </div>
        )
      }
  }
  return Combo
}
