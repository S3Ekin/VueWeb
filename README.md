### VueWeb

- 开始玩玩 vue,当然用 TS

1. #### 每次发请求获取菜单数据的后，并且渲染到 dom 上后，设置每个子菜单容器 dom 的高度，怎么做？

- 在 update 生命周期里要识别是通过 api 改变的数据，
- 解决方式：
  - 用 watch 观察数据变动，注意与 react 区别，不用返回新数据直接在节点上改动，也就是 .语法， 只在重新获取数据的时候赋值。
  - 通过 vue nextTick 方法（可以在任何地方调用） ，也就是在 dom 全挂载后执行 dom 操作。不然 dom 没有挂载获取不到元素

2. #### 模态框组件 Modal 里,通过创建 Portal 组件指定渲染的 dom 位置，怎么把 Portal 的子组件\$slots.default 一个数组直接渲染出来，不用在外面加一层父级，或者如 React 加一个空标签<></>,vue 没有提供空标签？

- 在 render 函数里 ， 循环数组 调用 createElement 方法，这样不行，也看不懂是在干嘛？

* 解决方式：
  > 1. 通过 h()，调用空的<span style='color: red;'>createElement</span>函数来制作空的节点
  > 2. render 函数是可以直接返回 VNode[]的,只是不知道为什么类型定义为 VNode
  > 3. 可以通过\$scopedSlots 里的插槽函数获取插槽

3. #### 注意模态框容器一个是在主体内容里面，一个是在外面，弹框也是放在主体里面，loading 容器也是放在主体内容里面
4. #### vue 在渲染的时候会把目标挂载元素 取代，换成模板里的 html，也就是虚拟 dom，怎样只是把 VNode,增加到目标挂载元素的字节点上，不取代父元素.

---

5. #### vue 的 data 某个属性为 数组， 把这个属性的 length = 0 ，是没有用的, 并且改变某个属性的值(对象),直接改这个属性，不用重新赋值，react 是得重新赋值,只要不是重新赋值，在 watch 时，deep：false ，时，改变节点属性不会被检查到，但是改变数组得长度会。

```javascript
arr = [1, 3, 4];
arr.length = 0; //没有用
obj = [{ name: 1 }, { name: 2 }];
obj[0].name = 3; //直接改
```

6. #### vue 在初始化 data 的某个值的时候，要是没有初始值，在第一次赋值的时候，不会响应到 ui 界面，例如场景： 模态框的新增和回填。

```js
    @Component({
        props:{
            addOrEdit:Boolean,
            show:Boolean,
            rowData:Object,
        }
        watch: {
            show:function(val){
                val && this.initRowData()
            }
        }
    })
    class Some extends Vue {
        myData:any[];
        setRowData(){
            if(this.addOrEdit){
                // 注意要克隆
                // 要是直接 this.myData = this.rowData 会导致在改变this.myData 时改变this.rowData
                // 相当于改变了 父组件的某一行记录
                this.myData =object.assign({},this.rowData);
            }else{ // 新增
                this.myData = {name:""}
            }
        }
    }
```

7. #### 给菜单加的点击事件，( 不是在 router-link 上) 当点击的时候，该事件会先触发路由，在对应的路由渲染完成后再调用，因为路由元素是其子元素。所以在点击菜单取消 notice 和 loading 时候，应该在路由钩子 beforeEach 里做关闭。要是给菜单的事件设置为捕获事件 capture,则会先处理这个点击事件再会处理路由的触发事件,这样可以不用早路由钩子里关闭 notice 和 loading

```typescript
    <div
        v-for="menu in list.menuChildList"
        :key="menu.code"
        :data-code="menu.code"
        :class="{active:menu.active}"
        class="menu-item menu-child"
        @click.capture="navMenuItem" //  注意capture
        >
        <router-link
            :to="'/'+menu.url"
            class="nav-item"
            :replace="true"
            @click="test"
        >
            {{ menu.name }}
        </router-link>
    </div>
```

8. #### 组件自己调用自己的时候， 通过指定 name 属性名称，注意 name 指定在 Vue.extend({name:xxx})没用

```js
const props = Vue.extend({
  // 在这指定无用
});
@Component({
  name: "My",
})
class My extends props {}
```

9. #### v-for 指令里，怎样取到循环里的变量 item 来作为计算属性里的一个变量来计算其他的值？

```typescript
 <div class="m-child-list">
      <ul>
        <li
          v-for="(item , index) in child"
          :key="item[filedObj.id]"
        >
          <TreePar
            v-if="item[filedObj.child].length" // 怎样把 item[filedObj.child].length 作为一个计算属性存起来
            :filed-obj="filedObj"
            :node="item"
            :path="path + '-' + index"
            :lev="lev + 1"
          />
          <div
            v-else
            class="m-item"
            :data-path="path + '-' + index"
            :style="{paddingLeft: (lev+1)*20 + 'px'}"
          >
            {{ item[filedObj.text] }}-child
          </div>
        </li>
      </ul>
    </div>
    ...
    // 怎样取到item 的值作为一个变量 ？
     new Vue({
        computed:{
            isPar: function(){
                //  item 是 v-for指令里的变量 怎样取到它？
                return item[filedObj.child].length
            }
        }
    })
```

> ！<span style="color: red;">必须得用 render 来处理吗？</span>

#### 可以在模板里调用方法来返回，也可以 j 计算属性返回个函数，然后调用

```typescript
   <li
        v-for="(item , index) in child"
        :key="item[filedObj.id]"
    >
    {{isPar(item)}}
    {{getItem(item)}}
    </li>
    ...
    new Vue({
        computed:{
            isPar: function(item){
                //  item 是 v-for指令里的变量 怎样取到它？
                return function(){
                    return item[filedObj.child].length
                }
            }
        },
        methods:{
            getItem: function(item){
                return item.some
            }
        }
    })
    //计算j属性会缓存，方法每次都会调用
```

10. #### 怎样在模板里调用一个方法，返回的是 html 或是一个 vue 组件？

```typescript
    <li
    >
        {{getItem("e")}}
    </li>
     ...
     import Button from "button"
    new Vue({
        methods:{
            getItem: function(item){
                return <div>{{item}}<div>
            },
            getBtn: function(item) {
                return <Button>{{item}}</Button>
            }
        }
    })
```

> 充分利用组件的 {components:} 来用临时组件，利用 template 里只能出现组件，具体看 tablelist/TBody.vye

```typescript
<td
    v-for="column in fileObj.column"
    :key="column.field"
    :class="'td-' + column.align"
    >
    <VNode
        :node="node"
        :column="column"
        :tabField="fileobj.tabField"
        :index="index"
    />
    </td>
...
@Component({
    name: "TBody",
    components: {
      Button,
      VNode: {
        functional: true,
        render: (h:CreateElement, ctx: RenderContext) => {
          const { node, column, tabField, index } = ctx.props
          const a = column.formatter ? column.formatter(node, index, tabField) : h("span", node[column.field])
          return a
        }
      }
    }
})
```

---

>

11. #### 废弃的 slot 属性，在组件已经挂载就能获取具名插槽，而 v-slot 要做组件挂载后才能获得？在使用了作用域后即使是在挂载后，也获取不能获取具名插槽

```typescript
    //具体看 tablelist/index.vue 和 applicaiton/index.vue 两个页面的引用关系
    fileobj = this.init();
    mounted ():void {
      console.log(this.$slot)
    }
    init(){
        console.log(this.$slot)
    }
```

> 目解决方法是用\$scopedSlots,但是也是在挂载后才能获取到,<span style="color: red;">在使用 slot 时，用具名插槽就把 default 也显示的标记，不然在获取所有的插槽时，会在获取 default 插槽时得到的顺序不一样</span>

---

12. #### v-slot 用 v-slot 来传递作用域变量时，在真正要显示使用的地方（子组件），传递变量用 v-bind 或声明名称 v-bind:obj="obj",就可以在把子组件的信息传递给父组件来使用。

- 注意
  > 1. 在 在跨级传递时，会有些问题要注意，也就是在“爷父子”，三级组件从子通过父再传给爷时要注意插件对应的关系。通过文件<span style="color: red;"> application/index.vue - tablelist/index.vue - tablelist/TBody.vue </span> 来观察。
  > 2. 目前没有想到直接把爷组件 j 具名插槽直接给子组件的方法，得再中间层父组件在命名一具名插槽。因为要具名插槽一一分开传递，并且要带上作用域。
  > 3. 在三级组件插槽传递时，在爷组件使用作用域时，发现使用变量的第 3 层属性报错，不知道为什么

```typescript
// 子组件 TBody
    <td
        v-for="column in fileObj.column"
        :key="column.field"
        :class="'td-' + column.align"
    >
        <slot
            :name="column.field"
            :node="node"
        >
            {{ node[column.field] }}
        </slot>
    </td>
    ...
    // 父组件 Table
     <TBody
        :table-data="data"
        :file-obj="fileObj"
        :per-nums="perNums"
        :cur-page="curPage"
      >
        <template
          v-for="item in fileObj.column"
          v-slot:[item.field]="{node}"
        >
          <slot
            :name="item.field"
            :node="node"
          />
        </template>
      </TBody>
      ...
      // 爷组件
      <div class="page-main">
        <Table
          :data="list"
          :no-order="true"
          id-field="code"
        >
          <template #default>
            <Column
              field="sn"
              name="排序"
            />
           ...
          </template>
          <template v-slot:url="{node}">
            <Column
              field="url"
              name="URL"
            >
              {{ node }} //可以
              {{ node.ip + "/" + node.homePage }} //报错
            </Column>
          </template>
         ...
        </Table>
      </div>
```

- 不明白为什么会这样，在爷组件里。作用域 node 返回的也不是字符串就是不能引用里面的属性
  > 当把父组件在的 作用域改为如下就可以用了。正常的没有三级传递的没有这样的情况，看 users/ 下的测试文件

```typescript
 <slot
    :name="item.field"
    v-bind="node"
    />
```

- 找到原因了
  > 1. 因为涉及到异步请求，在第一次额渲染时，表格的数据为空[],从子作用域传来的数据是没有的是个空对象{},而在爷组件又使用了那些属性，所以报错
  > 2. 当涉及到作用域插件的作用域值就得判断，这个值存在不,特别这种异步传递值得

---

13. #### 在需要对 vue 的 data（也是类的实例属性）初始化时，要是要用一个函数初始化多个属性，本来可以在构造函数 constructor 里来执行，为了不用构造函数，用 vue 的 created 生命周期钩子里初始化，这是周期的第 2 阶段，可以获取属性。第一阶段 beforeCreated 不可以获取属性具体看 combo/DropList.vue
    > 1. 注意必须先初始化值，让 vue 对据据进行 observe,否则数据不会与 ui 进行绑定渲染

```typescript
class DropList extends Vue {
  ...
    listData: node<activeStatus>[] = []; // 注意必须先初始化值，让vue对据据进行 observe
    singleClickPre = ""
    created ():void{
      const { defaultVal } = this.filedObj
      const prop = this.getProp()
      const obj = formatterListData(prop as drop<"list">, defaultVal)
      this.listData = obj.data
      this.singleClickPre = obj.singleClickPre
      this.bindMethod<"click">(this.clickItem, "click")
    }
}
```

---

14. ### 不通过 ref ,把子组件的方法给父组件使用时， 把子组件方法传给父组件时，要把类的直接的实例方法，传出去，不然通过这个方法获取类的成员时，获取的只是第一次的初始值具体看 combo/util/Combo.tsx

```typescript
class Combo extends Vue {
  ...
    selected:ISelected[] = [{ id: "1", text: "3333" }]
    created ():void {
      if (this.bindComMethods) {
        this.bindComMethods(this.exportMethods)
      }
    }
  // 暴露给外面的方法
  exportMethods:comboMethods = {
    // getSelected: this.getSelected
    getSelected: () => { // 要是直接在这写返回函数是不会把 selected 的值动态返回出去，只会返回初始值，但是正常返回了this的上下文Combo,
      console.log(this.drop)
        return this.selected.slice()
    }
  }

  getSelected (): ISelected[] {
      return this.selected.map(val => val)
  }
}
```

> 1. 注意框加的数据的 observer 原理

---

15. #### 完全可以把<template></template> 当空标签用。 v-for 时很有用

---

16. #### 写 tree 类型时，知道几个固定的知道，但是 children 字段不清楚，目前写法是用 范型代替 chidren 字段并给默认值"children"。并给代表 children 类型的 类型范型，也给默认值“children”j 具体看 combo/Combobox.d.ts

```typescript
type treeNode<a, p extends string = "children"> = {
  [k in p]: treeNode<a, p>[];
} &
  anyObj<{
    active: a;
    expand?: boolean;
  }>;

export type filedObj<P extends keyof IDrop, c extends string = "children"> = {
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
} & IDrop<c>[P];
```

---

17. ### Vue 更新 data 的方法，其关键还是返回新数据。与 React 的比较原理还是一样，要是运用 Immutable.js 也很不错的。

- 发现了在 ComTree 里总是更新不了数据的原因了，发现在通过 prop 传过来的属性 data 来构造自己的 treeData 时，没有进行深复制，**JSON.parse(JSON.stringify())**，
- 导致用 **.** 语法时，总是不能更新 dom,即使数据更新了，dom 还是没变。但是也发现了一个有趣现象。改变某个值的类型为 **string** 、**number**时，可以更新到 dom 上，不管其层级深度。但是 Object 和 boolean 的类型不行。

```typescript
// 当直接使用 props的data来作为 自己的data时。
class ComBoTree {
  @Prop() data:any[];
  treeData = data
 ...
 expandToggle (index:string):void {
     const { filedObj: { childField } } = this
     const indexArr = index.split(",").join(`,${childField},`).split(",")
     const node = this.treeData[0]
     // node[childField][0].name = new Date().getTime() // 会更新
     // node.expand = !node.expand // 不会更新
     // this.treeData[0].expand = !node.expand // 不会更新
     // this.treeData[0] = Object.assign({}, node) // 不能更新
     // this.$set(this.treeData, 0, node) // 子组件 ParItem 不会更新
     this.$set(this.treeData, 0, Object.assign({}, node)) // 会更新
 }
 ...
}
```
- 当把 data 的数据进行深复制，也就是不与 props 里的值发生关联是，不管其层级，都可以用 **.** 语法的
- 使用 **.** 语法可以更新数据，也会重新render，但是如果当前组件的dom没用用到这个状态就不会触发**updated**,如果dom用了会引使组件的 **updated** 方法调用，下面的例子当点击树性节点的时候，**其实官网已经说明了“由于数据更改*导致的虚拟 DOM 重新渲染和打补丁*，在这之后会调用该钩子。”**，之前没看明白，以为知道了，现在明白了。**导致当前组件的虚拟dom重新渲染和打补丁**。这样有好处也有弊端，减少不必要的调用。但是有的时候即使当前组件dom不需要变动，但是它子组件（*注意子组件不是虚拟dom，是一个组件函数*）要根据组件的updated调用来更新，比如scrollBox组件。这点和react完全不一样，react只要数据变更就会render和调用组件更新的生命周期函数
- 再次强调，要使 **.** 语法起作用。设置的属性，一定是在赋值数据时就有的，不然vue不会oberver 这个属性，改变它不会引起render。除非重新给整个数据赋值。
```vue
<template>
  <div class="drop-ul">
  // 这里故意把所有节点渲染出来成dom,以前是把节点传入子组件，直接用.语法改节点不会调用 updated
    <div
      v-for="val in treeData"
      :key="val.code"
      :style="{height: '50px', overflow: 'hidden'}"
    >
      {{
        val.active
      }}
      <div
        v-for="item in val[filedObj.childField]"
        :key="item.code"
      >
        {{ item.active }}
        <div
          v-for="node in item[filedObj.childField]"
          :key="node.code"
        >
          {{ node.active }}
        </div>
      </div>
    </div>
    or 
    <ul
      :style="{maxHeight: maxHeight ? maxHeight + 'px' : undefined, overflow: 'auto'}"
      @click="clickItemEvent"
    >
      <template
        v-for="(val, oindex) in treeData"
      >
        <ParItem
          v-if="val[filedObj.childField].length"
          :key="val[filedObj.idField]"
          :node="val"
          :index="oindex + ''"
          :lev="0"
        >
          <template v-slot:item="{itemNode}">
            <slot
              name="item"
              :item-node="itemNode"
            />
          </template>
        </ParItem>
        <DropItem
          v-else
          :key="val[filedObj.idField]"
          :node="val"
          :index="oindex + ''"
          :lev="0"
          :check-box="filedObj.multiply"
        >
          <template v-slot="{itemNode}">
            <slot
              name="item"
              :item-node="itemNode"
            />
          </template>
        </DropItem>
      </template>
    </ul>
  </div>
</template>
<script lang="typescript">
// 当直接使用 props的data来作为 自己的data时。
class ComBoTree {
 ...
 clickItem (index?: string):void {
      const { filedObj, selected, changeSelect } = this
      if (!index) {
        this.clear()
        return
      }
      const multipy = filedObj.multiply
      const idField = filedObj.idField
      const textField = filedObj.textField
      const childField = filedObj.childField
      const clickForbid = filedObj.clickOrCheckForbid!
      const comField = filedObj.field
      const indexArr = index.split(",").join(`,${childField},`).split(",")
      const indexArrString = indexArr.join(",")
      const _data = this.treeData
      const oldSelectedIndex = this.oldSelectedIndex
      let _select = selected.map(val => val)
      const newNode = getNodeByPath(indexArr, _data)
      if (!newNode) {
          return
      }
      // 判断是否禁止点击
      if (clickForbid && clickForbid(newNode, comField, selected)) {
          return
      }
      // 单选清除以前选中的
      if (oldSelectedIndex === indexArrString) {
          // 点击的是同一个
          return
      }
      if (oldSelectedIndex) {
          getNodeByPath(oldSelectedIndex.split(","), _data).active = activeStatus.noSelect
      }
      _select = []
      // 判断这个node有没有被选中
      const active = newNode.active === activeStatus.select
              ? activeStatus.noSelect
              : activeStatus.select

      if (active === activeStatus.select) {
          _select.push({
              id: newNode[idField],
              text: newNode[textField]
          })
      } else {
          if (multipy) {
              _select = _select.filter(_val => {
                  return `${_val.id}` !== `${newNode[idField]}`
              })
          }
      }
      newNode.active = active // 这里改变节点的状态，相应的dom上应用这个状态的也会改变，但是却不会使组件的调用updated方法
      // 这里使改变父节点的数据，而且这个数据又作为属性传给该组件，所以会更新
      changeSelect(_select, newNode) // 这里使改变父节点的数据，而且这个数据又作为属性传给该组件，所以会更新会使组件调用 updated 方法
      this.oldSelectedIndex = indexArrString
  }
 ...
}
</script>
```
---

18. #### Vue 事件不能动态把指定为 null 或是 undefind,这样会报错，怎么解决有时需要事件在具体的函数和 null 之间切换？
19. #### Vue jsx 写法的 slot 相关文件 combo/util/combo.tsx
    - 1. <slot> 标签用 js 的写法代替
      ```typescript
        class Combo extends Vue {
          ...
          $scopedSlots!:{
            inp?:NormalizedScopedSlot,
          }
          render () {
            const { inp } = this.$scopedSlots  // inp({}) 是用来传入作用域参数，返回一个Vnode
            return (
              ...
                <ComboInp
                  drop={drop}
                  tit={tit}
                  selected={selected}
                  slideFn={slideDrop}
                  noicon={noicon}
                  ableClear={ableClear}
                  noRequire={noRequire}
                  clearFn={exportMethods.click}
                >
                  {
                    inp ? inp({
                      selected
                    }) : undefined
                  }
                </ComboInp>
              ...
            )
          }
        }
      ```
      ***
    - 2. 写在子标签内会总是在 render 时，更新实际运用 插槽的 所有 DropItem 子组件，不管数据有没变动
```jsx
          class Combo extends Vue {
            ...
            $scopedSlots!:{
              inp?:NormalizedScopedSlot,
            }

            dropScoped = {
              inp: (props) => {
                const  { itemNode } = props
                return (<div>作用域: {itmeNode.text}</div>)
              }
            }
            render () {
              const { inp } = this.$scopedSlots  // inp({}) 是用来传入作用域参数，返回一个Vnode
              return (
                ...
                  <div
                    class={"m-drop " + this.directionUpName + activeName}
                    data-event={eventKey}
                    style={{ width: dropWidth ? dropWidth + "px" : undefined }}
                  >
                    <SlideBox slide={drop} directionUp={directionUp}>
                      // 直接写子元素作 为 slot
                      <Drop
                        data={data}
                        initSelect={this.initSelect}
                        initComboVal={initComboVal}
                        selected={selected}
                        changeSelect={changeSelect}
                        bindMethod={this.bindFn}
                        maxHeight={this.maxHeight}
                       >
                          <div>asdf</div> or asdfasd  // 不管是元素还是 字符串 都会导致全部刷新
                       </Drop>
                       // 把用函数当子元素，收传过来的作用域，
                       <Drop
                        data={data}
                        initSelect={this.initSelect}
                        initComboVal={initComboVal}
                        selected={selected}
                        changeSelect={changeSelect}
                        bindMethod={this.bindFn}
                        maxHeight={this.maxHeight}
                       >
                       { function(props) { // 还是会导致刷新
                          const { itemNode } = prpos
                          return inp ? inp({itemNode}) : undefined
                        }
                       }
                       </Drop>
                       //   自己声明一个 scoped 对象，用来传递，还是会刷新
                       <Drop
                        data={data}
                        initSelect={this.initSelect}
                        initComboVal={initComboVal}
                        selected={selected}
                        changeSelect={changeSelect}
                        bindMethod={this.bindFn}
                        maxHeight={this.maxHeight}
                        scopedSlots={this.dropScoped}  // 要理解 这jsx元素  和 vue里元素不是完全一样的 特别是属性这一块 和vue指令
                       />
                       // 直接把上级传过来的 scopeSlots 传过去，这样就不会刷新
                       <Drop
                        data={data}
                        initSelect={this.initSelect}
                        initComboVal={initComboVal}
                        selected={selected}
                        changeSelect={changeSelect}
                        bindMethod={this.bindFn}
                        maxHeight={this.maxHeight}
                        scopedSlots={this.scopedSlots}  // 要理解 这jsx元素  和 vue里元素不是完全一样的 特别是属性这一块 和vue指令
                       />
                    </SlideBox>
                  </div>
                ...
              )
            }
          }
         // scopedSlots 会被转化为如下，而不是属性。所以当在vue的 template里使用这样的属性时。是没有用的。如同在jsx里使用 v-for 等指令是不对的
          createElement(Drop, {
              attrs: {
                data: data,
                initSelect: this.initSelect,
                initComboVal: initComboVal,
                selected: selected,
                changeSelect: changeSelect,
                bindMethod: this.bindFn,
                maxHeight: this.maxHeight
              },
              scopedSlots: this.$scopedSlots
            })
```
>  * **为什么会总是更新全部的数据？**
>  *  如果每次 renden 传给 scopedSlots 都是一个新对象，那肯定会全部更新。包括给直接写子元素（会转化为一个createElement函数的调用，相当于每次render都是新的。自己声明的不行，是因为，自己声明的对象没经经过vue内部的方法转化和观察，会先转化，于是生成新的对象。而直接把上级的scopedSlots传过就j避免了每次生成新对象的问题）
  20. #### 为什么 scopedSlots 在 created 和 beforeMount 都不能获取到具名插槽? 看到有直接在 created 给$slots赋值。加了作用域就不能获取到

```vue
<template>
  <div><slot></slot> //此处修改为slot</div>
</template>

<script>
export default {
  methods: {
    renderChild() {
      return <div>Child</div>; //在vue jsx插件 3.4.0 之后， h 会自动注入
    },
  },
  created() {
    this.$slots.default = [this.renderChild()]; //其实原理就是手动给slot赋值。
  },
};
</script>
```
---

21. ####父组j监听子组件的生命周期，当子组件在生命周期有变动时，执行某些操作，比如 滚动条组件，在包裹的子组件内容变化时，变多或变少，重j计算高度问题。但是slot 插槽用这个方j监听到。react有没这种？
```vue
<template>
      <ComboList
        :data="data"
        field="test2"
        :width="200"
        default-val="3,4"
        :multiply="true"
        :direction-up="true"
        :able-clear="true"
        :init-combo-val="init"
        @hook:updated="test" 
      /> 
</template>
```
---

22. #### 当组件里嵌套子组件时，只要根组件跟新，不管子组件j接收的数据有没变化都会更新。
- 改变**User**组件的**test**数据时，ScrollBox也会更新，即使没有传入任何数据给他，他自己的内部的数据也没有变化。
- 其实User每次 **render** ScrollBox的子组件都会重新生成。这点和React一，但是字符串和数字Vue也是重新生成对象，React这点不是。
```vue
<template>
  <div class="role-page">
    <div>
      <Button :handle="click3">
        data {{ data.length }}
      </Button>
      <Button :handle="click2">
        test {{ test }}
      </Button>
    </div>
    <div class="test-scroll">
      <ScrollBox>
        wer
        or
       <div>测试</div>
        or
        <div class="tab-list">
          <div
            v-for="val in data"
            :key="val.id"
            class="item"
          >
            <b>{{ val.id + 1 }}</b>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ val.text }}</span>
          </div>
        </div> 
      </ScrollBox>
    </div>
  </div>
</template>

<script lang="ts">
export default class User extends Vue {
  data = [
    { id: 1, text: "er1" },
    { id: 2, text: "er2" },
  ]
  test = 0
  updated ():void {
    console.log("update Root")
  }
  click3 ():void {
      this.data = new Array(Math.floor(Math.random() * 10000)).fill("").map((val, index) => {
          return {
              id: index,
              text: Math.floor(Math.random() * 30) * index
          }
      })
  }
  click2 ():void {
     this.test++
  }
}
</script>
```

---
23. #### vue不会做事件代理，**v-on** 指令绑定的事件是直接绑定在对应的**dom**上的。
24. #### vue 怎样 再template里使用不是类成员的数据?
```vue
<template>
  <div>{{ data }}</div>
</template>

<script>
const data = "test" // 要把这个数据给tempalte里使用，必须让它成为类成员吗？
export default {
  methods: {
    renderChild() {
      return <div>Child</div>; //在vue jsx插件 3.4.0 之后， h 会自动注入
    },
  },
  data:{

  },
  created() {
    this.$slots.default = [this.renderChild()]; //其实原理就是手动给slot赋值。
  },
};
</script>
```
25. #### 觉得vue好神奇
    1. 通过表格的全选和单选，涉及的计算属性和对应的渲染策略，让我更觉得vue的模式和用法好神奇， 特别是那个 【allChecked】属性。不用显示的直接去改变它，只要改动了它所依赖的属性的值，它就会变化
    2. 当第一次发现vue没有做事件代理时，觉得好愚蠢。同时生气几乎在所有的for循环的字节的里绑定了事件，也就是说我这样给所有的真实的dom绑定了事件。要是不该，我太难忍了。只用自己做事件代理了。我还去特地看了看react的，它是事件代理，但也给每个dom绑定了事件，不过这个直接的事件不是正式触发行为的事件，正式的事件是在document里，所以删掉也不影响。
    3. 当在vue的组件里做了事件代理后，发现组件简洁了，不用给子组件传递很多东西。组件交互可以就放在最外层的组件上，可以让逻辑集中，子组件更专注于ui渲染。