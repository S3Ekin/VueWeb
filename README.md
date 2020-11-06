### VueWeb
* 开始玩玩vue,当然用TS
1. #### 每次发请求获取菜单数据的后，并且渲染到dom上后，设置每个子菜单容器dom的高度，怎么做？
* 在update生命周期里要识别是通过api改变的数据，
* 解决方式： 
    - 用 watch 观察数据变动，注意与react 区别，不用返回新数据直接在节点上改动，也就是 .语法， 只在重新获取数据的时候赋值。 
    - 通过vue nextTick方法（可以在任何地方调用） ，也就是在dom全挂载后执行dom操作。不然dom没有挂载获取不到元素 
2. #### 模态框组件Modal里,通过创建Portal 组件指定渲染的dom位置，怎么把Portal 的子组件$slots.default 一个数组直接渲染出来，不用在外面加一层父级，或者如React 加一个空标签<></>,vue没有提供空标签？
- 在render函数里 ， 循环数组 调用createElement 方法，这样不行，也看不懂是在干嘛？ 
* 解决方式：
> 1. 通过h()，调用空的<span style='color: red;'>createElement</span>函数来制作空的节点
> 2. render 函数是可以直接返回VNode[]的,只是不知道为什么类型定义为VNode
> 3. 可以通过$scopedSlots里的插槽函数获取插槽 
3. #### 注意模态框容器一个是在主体内容里面，一个是在外面，弹框也是放在主体里面，loading容器也是放在主体内容里面 
4. #### vue在渲染的时候会把目标挂载元素 取代，换成模板里的html，也就是虚拟dom，怎样只是把VNode,增加到目标挂载元素的字节点上，不取代父元素. 
---
5. #### vue 的data 某个属性为 数组， 把这个属性的 length = 0 ，是没有用的, 并且改变某个属性的值(对象),直接改这个属性，不用重新赋值，react是得重新赋值,只要不是重新赋值，在watch时，deep：false ，时，改变节点属性不会被检查到，但是改变数组得长度会。
``` javascript
    arr = [1,3,4] ; 
    arr.length = 0; //没有用
    obj = [{name:1},{name:2}];
    obj[0].name = 3  //直接改
```

6. #### vue 在初始化data的某个值的时候，要是没有初始值，在第一次赋值的时候，不会响应到ui界面，例如场景： 模态框的新增和回填。
``` js
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
7. #### 给菜单加的点击事件，( 不是在router-link上) 当点击的时候，该事件会先触发路由，在对应的路由渲染完成后再调用，因为路由元素是其子元素。所以在点击菜单取消notice和loading时候，应该在路由钩子beforeEach里做关闭。要是给菜单的事件设置为捕获事件capture,则会先处理这个点击事件再会处理路由的触发事件,这样可以不用早路由钩子里关闭notice和loading
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
8. #### 组件自己调用自己的时候， 通过指定name属性名称，注意name指定在 Vue.extend({name:xxx})没用
```js
    const props = Vue.extend({
        // 在这指定无用
    })
    @Component({
        name:"My",
    })
    class My extends props {}
```
9. #### v-for 指令里，怎样取到循环里的变量item 来作为计算属性里的一个变量来计算其他的值？
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
#### 可以在模板里调用方法来返回，也可以j计算属性返回个函数，然后调用
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
10.  #### 怎样在模板里调用一个方法，返回的是html或是一个vue组件？
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
> 充分利用组件的 {components:} 来用临时组件，利用template里只能出现组件，具体看 tablelist/TBody.vye
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
----
> 
11.  #### 废弃的slot属性，在组件已经挂载就能获取具名插槽，而v-slot要做组件挂载后才能获得？在使用了作用域j即使是在挂载后，也获取不j具名插槽
```typescript
    //具体看 tablelist/index.vue 和 applicaiton/index.vue 两个页面的引用关系
    fileobj = this.init();
    mounted ():void {
      console.log(this.$slot)
    }
    init(){
        console.log(this.$lot)
    }
```
> 目解决方法是用$scopedSlots,但是也是在挂载后才能获取到,<span style="color: red;">在使用slot时，用j具名插槽j就把default也显示的标记，不然在获取所有的插槽时，会在获取default插槽时得到的顺序不一样</span>
----
12. #### v-slot 用v-slot 来传递作用域变量时，在真正要显示使用的地方（子组件），传递变量用v-bind 或声明名称 v-bind:obj="obj",就可以在把子组件的信息传递给父组件来使用。
* 注意
> 1. 在 在跨级传递时，会有些问题要注意，也就是在“爷父子”，三级组件从子通过父再传给爷时要注意插件对应的关系。通过文件<span style="color: red;"> application/index.vue - tablelist/index.vue - tablelist/TBody.vue </span> 来观察。
> 2. 目前没有想到直接把爷组件j具名插槽直接给子组件的方法，得再中间层父组件在命名一具名插槽。因为要具名插槽一一分开传递，并且要带上作用域。
> 3. 在三级组件插槽传递时，在爷组件使用作用域时，发现使用变量的第3层属性报错，不知道为什么
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
* 不明白为什么会这样，在爷组件里。作用域 node返回的也不是字符串就是不能引用里面的属性
> 当把父组件在的 作用域改为如下就可以用了。正常的没有三级传递的没有这样的情况，看users/ 下的测试文件
```typescript
 <slot
    :name="item.field"
    v-bind="node"
    />
```
* 找到原因了
> 1. 因为涉及到异步请求，在第一次额渲染时，表格的数据为空[],从子作用域传来的数据是没有的是个空对象{},而在爷组件又使用了那些属性，所以报错
> 2. 当涉及到作用域插件的作用域值就得判断，这个值存在不,特别这种异步传递值得
----
13. #### 在需要对vue的data（也是类的实例属性）初始化时，要是要用一个函数初始化多个属性，本来可以在构造函数constructor里来执行，为了不用构造函数，用vue的created生命周期钩子里初始化，这是周期的第2阶段，可以获取属性。第一阶段 beforeCreated不可以获取属性具体看combo/DropList.vue
> 1. 注意必须先初始化值，让vue对据据进行 observe,否则数据不会与ui进行绑定渲染
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
14. ### 不通过ref ,把子组件的方法给父组件使用时， 把子组件方法传给父组件时，要把类的直接的实例方法，传出去，不然通过这个方法获取类的成员时，获取的只是第一次的初始值具体看 combo/util/Combo.tsx
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
> 1. 注意框加的数据的observer原理
---
15. #### 完全可以把<template></template> 当空标签用。 v-for 时很有用
---
16. #### 写tree类型时，知道几个固定的知道，但是children字段不清楚，目前写法是用 范型代替chidren字段并给默认值"children"。并给代表children类型的 类型范型，也给默认值“children”j具体看 combo/Combobox.d.ts
```typescript
type treeNode<a, p extends string = "children"> = {
  [k in p]:treeNode<a, p>[];
} & anyObj<{
 active: a;
 expand?: boolean;
}>

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
----
17. #### Vue 更新data的方法，其关键还是返回新数据。与React的比较原理还是一样，要是运用Immutable.js 也很不错的。
   * 发现了在ComTree 里总是更新不了数据的原因了，发现在通过prop传过来的属性data来构造自己的treeData时，没有进行深复制，**JSON.parse(JSON.stringify())**，
   * 导致用 **.** 语法时，总是不能更新dom,即使数据更新了，dom还是没变。但是也发现了一个有趣现象。改变某个值的类型为 **string** 、**number**时，可以更新到dom上，不管其层级深度。但是Object和boolean 的类型不行。 
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
   * 当把data的数据进行深复制，也就是不与props 里的值发生关联是，不管其层级，都可以用 **.** 语法的
   ---
   18. #### Vue 事件不能动态把指定为null 或是 undefind,这样会报错，怎么解决有时需要事件在具体的函数和null之间切换？

