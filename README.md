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
5. #### vue 的data 某个属性为 数组， 把这个属性的 length = 0 ，是没有用的, 并且改变某个属性的值 对象直接改这个属性，不用重新赋值，react是得重新赋值,只要不是重新赋值，在watch时，deep：false ，时，改变节点属性不会被检查到，但是改变数组得长度会 
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
    