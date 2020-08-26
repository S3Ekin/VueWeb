# VueWeb
开始玩玩vue,当然用TS
# 每次发请求获取菜单数据的后，并且渲染到dom上后，设置每个子菜单容器dom的高度，怎么做？
1、 在update生命周期里要识别是通过api改变的数据，
解决方式： 
    1用 watch 观察数据变动，注意与react 区别，不用返回新数据直接在节点上改动，也就是 .语法， 只在重新获取数据的时候赋值。
    2通过vue nextTick方法（可以在任何地方调用） ，也就是在dom全挂载后执行dom操作。不然dom没有挂载获取不到元素
# 模态框组件Modal里,通过创建Portal 组件指定渲染的dom位置，怎么把Portal 的子组件$slots.default 一个数组直接渲染出来，不用在外面加一层父级，或者如React 加一个空标签<></>,vue没有提供空标签？
    1，在render函数里 ， 循环数组 调用createElement 方法，这样不行，也看不懂是在干嘛？
解决方式：
    1 、通过h()，调用空的createElement函数来制作空的节点
    2、render 函数是可以直接返回VNode[]的,只是不知道为什么类型定义为VNode
    3、可以通过$scopedSlots里的插槽函数获取插槽
