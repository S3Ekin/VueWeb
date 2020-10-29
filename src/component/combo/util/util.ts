import { drop, ISelected } from "../Combobox"
import { node } from "../Combobox.d"
export enum activeStatus {
    select = "selected",
    hasSelect = "hasSelect",
    noSelect = "noSelect",
}

// 格式化数据，添加选中的字段 active ;
export const formatterListData = function (props: drop<"list">, defaultVal:string):{
    data: node<activeStatus>[];
    singleClickPre: string
} {
        const { filedObj, data, initSelect } = props
        const id = filedObj.idField
        const text = filedObj.textField
        const multiply = filedObj.multiply
        const defaultValArr = defaultVal.split(",")
        if (!multiply && defaultValArr.length > 1) {
            defaultValArr.length = 1
        }
        // 避免改变props里的data
        const copyData = JSON.parse(JSON.stringify(data))
        const listSelect: ISelected[] = []
        let oldSelected = ""
        const _data = copyData.map((val: node<activeStatus>, index: number) => {
            const isDefault = defaultValArr.includes(`${val[id]}`)
            val.active = isDefault
                ? activeStatus.select
                : activeStatus.noSelect
            // 初始化默认选中的
            if (isDefault) {
                listSelect.push({ id: val[id], text: val[text] })
                if (!multiply) {
                    // 单选的时候，才会有上一次保留的节点的索引
                    oldSelected = `${index}`
                }
            }

            return val
        })
        initSelect(listSelect)
        return {
            data: _data,
            singleClickPre: oldSelected
        }
    }
type fn = (arg: HTMLElement)=>void
const eventData:{
    [key:string]: fn
} = {}

export const event = {
    on: function (k:string, fn: fn):void {
       eventData[k] = fn
    },
    emit: function (k:string, argObj:HTMLElement):void {
        const fn = eventData[k]
        if (!fn) {
            return
        }
        eventData[k](argObj)
    },
    remove: function (k:string):void{
        if (eventData[k]) {
            delete eventData[k]
        }
    }
}
