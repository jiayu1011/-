/********************* V1 **************************/
// let price = 5
// let quantity = 2
// let total = 0
// // set不允许重复值，即保证effect的唯一性，dep为依赖集
// const dep = new Set()
//
// const effect = () => { total = price * quantity }
// const track = () => { dep.add(effect) }
// const trigger = () => { dep.forEach(effect => effect()) }
//
// track()
// console.log(total)
// trigger()
// console.log(total)


/**** 对象可能有多种属性，每种属性需要有独立的依赖（dep） ****/
/********************* V2 **************************/
// let product = {
//     price: 5,
//     quantity: 2
// }
// // depsMap按照key-value存储一个对象中所有属性的依赖集
// const depsMap = new Map()
// let total = 0
//
// const effect = () => {
//     total = product.price * product.quantity
// }
//
// const track = (key) => {
//     let dep = depsMap.get(key) // 获取对象中某个属性的依赖集
//     if (!dep) {
//         dep = new Set() // 若没有依赖集，则为之创建新的空集
//         depsMap.set(key, dep)
//     }
//     dep.add(effect)
// }
//
// const trigger = (key) => {
//     let dep = depsMap.get(key)
//     if (!dep) return
//     dep.forEach(effect => effect())
// }
//
// effect() // 计算一次total, total: 10
// track("quantity") // 跟踪属性quantity
//
// product.quantity = 5
// trigger("quantity") // total: 25, 动态更新了，依赖跟踪成功

/**** 可能需要跟踪多个响应式对象，用targetMap存储所有对象 ***/
/********************* V3 **************************/
// const targetMap = new WeakMap(); // WeakMap可以使用Object作为key
// let product = { price: 5, quantity: 2 }
// let total = 0
//
// const effect = () => {
//     total = product.price * product.quantity
// }
//
// const track = (target, key) => {
//     let depsMap = targetMap.get(target)
//     if (!depsMap) {
//         targetMap.set(target, (depsMap = new Map()))
//     }
//     let dep = depsMap.get(key)
//     if (!dep) {
//         depsMap.set(key, (dep = new Set()))
//     }
//
//     dep.add(effect)
// }
//
// const trigger = (target, key) => {
//     let depsMap = targetMap.get(target)
//     if (!depsMap) return
//     let dep = depsMap.get(key)
//     if (!dep) return
//
//     dep.forEach(effect => effect())
// }
//
// effect()
// track(product, "price")
//
// product.price = 6
// trigger(product, "price")


/**** 如何对getter和setter进行拦截？Proxy/Reflect *****/
/********************* V4 **************************/
// const reactive = (target) => {
//     const handler = {
//         get(target, key, receiver) {
//             // 将Proxy中的receiver传入Reflect，保证Reflect中的this指向的是Proxy代理的对象
//             return Reflect.get(target, key, receiver)
//         },
//         set(target, key, value, receiver) {
//             if (target[key] === value) return
//             return Reflect.set(target, key, value, receiver)
//         }
//     }
//     return new Proxy(target, handler)
// }
//
// const targetMap = new WeakMap(); // WeakMap可以使用Object作为key
// let product = reactive({ price: 5, quantity: 2 })
// let total = 0
//
// const effect = () => {
//     total = product.price * product.quantity
// }
//
// const track = (target, key) => {
//     let depsMap = targetMap.get(target)
//     if (!depsMap) {
//         targetMap.set(target, depsMap = new Map())
//     }
//     let dep = depsMap.get(key)
//     if (!dep) {
//         depsMap.set(key, dep = new Set())
//     }
//
//     dep.add(effect)
// }
//
// const trigger = (target, key) => {
//     let depsMap = targetMap.get(target)
//     if (!depsMap) return
//     let dep = depsMap.get(key)
//     if (!dep) return
//
//     dep.forEach(effect => effect())
// }
//
// track(product, 'quantity')
// effect()
// console.log(total) // total: 10
//
// product.quantity = 10
// trigger(product, 'quantity')
// console.log(total) // total: 50

/********** 属性被get时，触发track方法 *****************/
/****** 属性被set时，（重点）先set再触发trigger方法 ******/
/********************* V5 **************************/
// const reactive = (target) => {
//     const handler = {
//         get(target, key, receiver) {
//             track(target, key) // 属性被get时，触发track方法
//             return Reflect.get(target, key, receiver) // 将Proxy中的receiver传入Reflect，保证Reflect中的this指向的是Proxy代理的对象
//         },
//         set(target, key, value, receiver) {
//             if (target[key] === value) return
//             Reflect.set(target, key, value, receiver)
//             // 属性被set后（重点），调用trigger方法触发依赖更新
//             // FIXME: 一定要先Reflect.set再trigger，否则trigger触发的effect使用的值是更新前的
//             trigger(target, key)
//         }
//     }
//     return new Proxy(target, handler)
// }
//
// const targetMap = new WeakMap(); // WeakMap可以使用Object作为key
// let product = reactive({ price: 5, quantity: 2 })
// let total = 0
//
// const effect = () => {
//     total = product.price * product.quantity
// }
//
// const track = (target, key) => {
//     let depsMap = targetMap.get(target)
//     if (!depsMap) {
//         targetMap.set(target, depsMap = new Map())
//     }
//     let dep = depsMap.get(key)
//     if (!dep) {
//         depsMap.set(key, dep = new Set())
//     }
//
//     dep.add(effect)
// }
//
// const trigger = (target, key) => {
//     let depsMap = targetMap.get(target)
//     if (!depsMap) return
//     let dep = depsMap.get(key)
//     if (!dep) return
//
//     dep.forEach(effect => effect())
// }
//
// effect()
// console.log(total) // total: 10
// product.quantity = 10
// console.log(total) // total: 50

/****** 引入activeEffect, 将effect重构为传入函数的形式 **/
/********************* V6 **************************/
// const reactive = (target) => {
//     const handler = {
//         get(target, key, receiver) {
//             track(target, key) // 属性被get时，触发track方法
//             return Reflect.get(target, key, receiver) // 将Proxy中的receiver传入Reflect，保证Reflect中的this指向的是Proxy代理的对象
//         },
//         set(target, key, value, receiver) {
//             if (target[key] === value) return
//             Reflect.set(target, key, value, receiver)
//             // 属性被set后（重点），调用trigger方法触发依赖更新
//             // FIXME: 一定要先Reflect.set再trigger，否则trigger触发的effect使用的值是更新前的
//             trigger(target, key)
//         }
//     }
//     return new Proxy(target, handler)
// }
//
// const targetMap = new WeakMap(); // WeakMap可以使用Object作为key
// let product = reactive({ price: 5, quantity: 2 })
// let salePrice = 0
// let total = 0
//
// let activeEffect = null
//
// const effect = (eff) => {
//     activeEffect = eff // set activeEffect
//     activeEffect() // run it
//     activeEffect = null // unset activeEffect
// }
//
// const track = (target, key) => {
//     if (!activeEffect) return
//
//     let depsMap = targetMap.get(target)
//     if (!depsMap) {
//         targetMap.set(target, depsMap = new Map())
//     }
//     let dep = depsMap.get(key)
//     if (!dep) {
//         depsMap.set(key, dep = new Set())
//     }
//
//     dep.add(activeEffect)
// }
//
// const trigger = (target, key) => {
//     let depsMap = targetMap.get(target)
//     if (!depsMap) return
//     let dep = depsMap.get(key)
//     if (!dep) return
//
//     dep.forEach(effect => effect())
// }
//
// effect(() => { salePrice = product.price * 0.8 }) // 通过传参的方式执行副作用函数
// effect(() => { total = salePrice * product.quantity }) // 通过传参的方式执行副作用函数
//
// console.log(`total: ${total}, salePrice: ${salePrice}`) // total: 8, salePrice: 4
// product.quantity = 5
// console.log(`total: ${total}, salePrice: ${salePrice}`) // total: 20, salePrice: 4
// product.price = 10
// console.log(`total: ${total}, salePrice: ${salePrice}`) // total: 20, salePrice: 8, 由于salePrice不是响应式的，total没有更新

/***** 构造ref(1. 使用reactive 2. 使用对象访问器object accessors(源码中使用)) ******/
/********************* V7 **************************/
const reactive = (target) => {
    const handler = {
        get(target, key, receiver) {
            track(target, key) // 属性被get时，触发track方法
            return Reflect.get(target, key, receiver) // 将Proxy中的receiver传入Reflect，保证Reflect中的this指向的是Proxy代理的对象
        },
        set(target, key, value, receiver) {
            if (target[key] === value) return
            Reflect.set(target, key, value, receiver)
            // 属性被set后（重点），调用trigger方法触发依赖更新
            // FIXME: 一定要先Reflect.set再trigger，否则trigger触发的effect使用的值是更新前的
            trigger(target, key)
        }
    }
    return new Proxy(target, handler)
}

// 1. 使用reactive
// const ref = (initValue) => {
//     return reactive({ value: initValue })
// }

// 2. 使用对象访问器object accessors(源码方式，优点是除了value，添加其他东西的操作空间更大)
const ref = (raw) => {
    const r = {
        get value() {
            track(r, 'value')
            return raw
        },
        set value(newVal) {
            if (newVal === raw) return

            raw = newVal
            trigger(r, 'value')
        }
    }
    return r
}

const targetMap = new WeakMap(); // WeakMap可以使用Object作为key
let product = reactive({ price: 5, quantity: 2 })
let salePrice = ref(0)
let total = 0

let activeEffect = null

const effect = (eff) => {
    activeEffect = eff // set activeEffect
    activeEffect() // run it
    activeEffect = null // unset activeEffect
}

const track = (target, key) => {
    if (!activeEffect) return

    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }

    dep.add(activeEffect)
}

const trigger = (target, key) => {
    let depsMap = targetMap.get(target)
    if (!depsMap) return
    let dep = depsMap.get(key)
    if (!dep) return

    dep.forEach(effect => effect())
}


effect(() => { total = salePrice.value * product.quantity }) // 通过传参的方式执行副作用函数
effect(() => { salePrice.value = product.price * 0.8 }) // 通过传参的方式执行副作用函数

console.log(`total: ${total}, salePrice: ${salePrice.value}`) // total: 8, salePrice: 4
product.quantity = 5
console.log(`total: ${total}, salePrice: ${salePrice.value}`) // total: 20, salePrice: 4
product.price = 10
console.log(`total: ${total}, salePrice: ${salePrice.value}`) // total: 40, salePrice: 8, salePrice和total实现了响应式更新