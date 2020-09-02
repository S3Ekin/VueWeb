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
```html
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
    