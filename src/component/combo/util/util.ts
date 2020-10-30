import { drop, ISelected } from "../Combobox"
import { node, treeNode } from "../Combobox.d"
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

export const formatterTreeData = function (props: drop<"tree">, defaultVal:string, data: anyObj[], noInitState?:boolean):{
    data: treeNode<activeStatus>[];
    oldSelectedIndex: string
} {
        const { filedObj, initSelect } = props
        const id = filedObj.idField
        const text = filedObj.textField
        const childField = filedObj.childField
        const defaultValArr = defaultVal.split(",")

        const multiply = filedObj.multiply
        if (!multiply && defaultValArr.length > 1) {
            defaultValArr.length = 1
        }
        let oldSelectedIndex = ""
        let listSelected: ISelected[] = []

        const immutableData = JSON.parse(JSON.stringify(data), function (k, val) {
            if (Object.toString.call(val) === "[object Object]") {
                const node = val as node<activeStatus>
                let children = node[childField] as node<activeStatus>[]
                if (!children) {
                    children = []
                    node[childField] = children
                }
                // 执行目录和文件两种情况 ,添加,是否展开:expand和是否选中：active的状态
                let active: activeStatus
                if (children.length) {
                    if (multiply) {
                        const hasSelected = children.some((val) => {
                                return val.active === activeStatus.hasSelect
                            }
                        )
                        if (hasSelected) { // 子文件里面有点节点是有选的状态
                            active = activeStatus.hasSelect
                        } else {
                            // 根据子文件的选择情况来做对应的选中状态
                            const selectCount = children.reduce((cur, val) => {
                                let total = cur
                                if (val.active === activeStatus.select) {
                                    total++
                                }
                                return total
                            }, 0)
                            const childSize = children.length
                            if (selectCount === childSize) {
                                active = activeStatus.select
                            } else if (selectCount === 0) {
                                active = activeStatus.noSelect
                            } else {
                                active = activeStatus.hasSelect
                            }
                        }
                    } else {
                        // 单选
                        active = activeStatus.noSelect
                    }
                } else {
                    // 文件
                    const isDefault = defaultValArr.includes(`${node.get(id)}`)
                    active = isDefault ? activeStatus.select : activeStatus.noSelect
                    if (isDefault) {
                        listSelected.push({
                            id: node.get(id),
                            text: node.get(text)
                        })
                        if (!multiply) {
                            // 记录单选时的索引
                            oldSelectedIndex = path!.join(",")
                        }
                    }
                }
                // 添加字段
                node.active = active
                node.expand = true
            }
            return val
        })

        // 显示默认选中的,并且按照默认的顺序显示
        if (defaultVal) {
            const initDefaultSelectArr = defaultValArr.map(select => {
                return listSelected.find(val => `${val.id}` === select)!
            }).filter(val => val)

            listSelected = initDefaultSelectArr
        }
        // 显示默认选中的
        if (!noInitState) {
            initSelect(listSelected)
        }

        return {
            data: immutableData,
            oldSelectedIndex: oldSelectedIndex
        }
    }
