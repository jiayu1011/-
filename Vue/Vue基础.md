# Vue

## 设计模式

MVVM？（vue，react，angular）

Model View View-Model，核心枢纽是View-Model这一层，使得各部分之间通信都是双向的（双向绑定）；

MVC则是单向的数据传递



## *生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed



通常在created或mounted进行数据请求，created此时已经拿到data了



## 组件间通信

###### 父传子

父组件使用v-bind，<child v-bind="xxx"/>，子组件中使用props接收

###### 子传父

子组件使用$emit触发一个事件进行传值，父组件使用v-on，<child v-on="changeVal">进行事件监听，在回调函数中取值

###### EventBus

利用一个新的Event作为Vue空实例，将$emit和$on挂载上去，实现任意两个组件传值

###### Vuex









## **Vue的响应式原理（拦截getter/setter)

- Vue2的响应式是基于`Object.defineProperty`实现的
- Vue3的响应式是基于ES6的`Proxy`来实现的

### Vue2

##### 核心

`Obejct.defineProperty`的`get`和`set`函数

##### 实现

```js
const data = {
    name: {
        value: "123"
    },
    age: 189
};

function observer (target) {
    if (typeof target !== "object" || target === null) {
        return target
    }
    for (const key in target) {
        if (typeof target[key] === "object") {
            // 递归深度监听，处理嵌套对象
            observer(target[key]);
        } else {
            defineReactive(target, key, target[key]);
        }
    }
}

// 响应式数据处理
function defineReactive (target, key, value) {
    Object.defineProperty(target, key, {
        get () {
            return value;
        },
        set (newValue) {
            if (newValue === value) return;
            value = newValue;
            console.log("更新视图...");
        }
    })
}

// 变成响应式数据
observer(data);

data.name.value = "qwe"; // 触发视图更新...
```

局限性：

在删除或者添加对象属性时(`delete data.age`,`data.test = "..."`)，`Object.defineProperty`无法处理

解决方案：

使用`Vue.delete`和`Vue.set`



### Vue3

##### Proxy实现

```js
const data = {
    name: "xin",
    age: 18,
};

function reactive (target) {
    const handler = {
        get (target, key, receiver) {
            console.log(`访问了${key}属性`);
            return Reflect.get(target, key, receiver);
        },
        set (target, key, value, receiver) {
            console.log(`将${key}属性由${target[key]}改变为${value}`);
            Reflect.set(target, key, value, receiver);
        }
    };
    return new Proxy(target, handler);
}

const proxyData = reactive(data);
console.log(proxyData.name);
// 访问了name属性
// xin
proxyData.name = "qwe";
// 将name属性由xin改变为qwe
console.log(proxyData.name);
// 访问了name属性
// qwe

/***** 对象新增属性 *****/
proxyData.hobby = "basketball";
// 将hobby属性由undefined改变为basketball
console.log(proxyData.hobby);
// 访问了hobby属性
// basketball
```



##### 核心实现(基于effect, track, trigger的发布-订阅模式)

```js
```







## Virtual DOM

Vue1.x   没有虚拟DOM，更新时直接操作真实DOM，性能损耗严重



Vue2.x  引入虚拟DOM，更重视**js的动态性**，手写render function，对更新性能、初始化性能更友好。

更新性能：Diff算法来查找差异

使用模板html，内含编译器，以此来检测哪些是静态内容（不变化的）

（1）开发者心智负担降低，

（2）静态的信息

静态节点标注可以加速Diff算法





#### 传统操作

数据改变 → 操作DOM →视图更新

#### 虚拟DOM

数据改变 → 虚拟DOM（计算变更） → 操作真实DOM（patch vnode到真实dom树上） → 视图更新

**总结：使用virtual DOM时，在对比前后节点后，程序会最大限度地寻找并复用老节点中现有的DOM元素，不变的不变，变化的移动或者更新，缺少的补上，多余的删除**

用js表达DOM结构，结构如下：

```js
{
    tag: 'div',
    props: {
        id: 'app',
        classname: 'container'
    },
    children: [
        {
            ....
        }
    ]
}
```



#### 虚拟DOM的好处（可以用snabbdom做实验）

1. 在节点更新时，一次性比较并修改真实DOM中需要修改的部分，最后再在真实DOM中进行重排和重绘，减少原本多次重排重绘的性能消耗和对于新dom结构的子节点解析时间
2. 虚拟DOM本质是js，因而可以更方便地跨平台操作





## Diff算法

#### Diff算法简述（虚拟DOM的核心）

![diff](D:\个人资料\面试相关\前端\准备\Vue\diff.png)

##### 流程

1. 遍历老虚拟dom
2. 遍历新虚拟dom
3. 重新排序

假设有1000个节点，就要计算1000^3次，开销太大！所以Vue中的Diff算法做了优化

##### 优化

1. 只比较树中同一层级（深度），不跨级比较

2. 标签名不同，直接删除，不继续深度比较
3. 标签名相同时，key相同，则认为是相同节点，不继续深度比较

1000个节点只用计算1000次





#### h函数（生成VNode）

![h函数](D:\个人资料\面试相关\前端\准备\Vue\h函数.png)

sel：选择器，data：属性值，children：子节点



#### patch函数（对于vNode关联上DOM元素，并插入新的DOM，删除旧的DOM）

##### 执行时期

1. 首次渲染时把vNode给patch上去
2. 在diff时把新的vNode给patch上去

##### patchVNode

1. 关联DOM
2. 判断新旧vNode结构异同







## Vue3特性

### Composition API

#### 1. setup()函数 -> Vue2.x中写在method和data中的可以写在里面

```typescript
import {defineComponent} from 'vue'
...
export default defineComponent({
	// created实例被完全初始化之前
	setup(props, context){

	}
})
```



#### 2. ref() reactive()实现响应式引用(通过Vue3包了一层Proxy实现响应式)

ref: Proxy({value: xxx})这样



ref用于基本数据类型(number, boolean, string, null, undefined)

reactive用于引用数据类型(Object，其中包含Function, Array, Date)

```typescript
import {ref, reactive, defineComponent} from 'vue'
...

export default defineComponent({
	setup(props, context){
        let temp = ref(1)
        setTimeout(() => {
            temp.value = 2
        }, 1000)
	}
})
```



#### 3. toRefs()实现响应式解构赋值





## 面试题



### v-model和v-bind(:xxx="xx")的区别？

v-bind是**单向绑定**，只能由Vue实例的属性单向渲染到视图上，如:class="xxx", :class="xxx", :src="xxx"；

v-model是**双向绑定**，可以在视图更新时同时将更新传回属性更新属性，如input，textarea等表单元素可以使用v-model双向绑定来实时更新属性数据。
