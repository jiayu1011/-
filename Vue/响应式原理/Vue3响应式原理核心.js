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
// trigger()


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
// // effect() // 计算一次total, total: 10
// // track("quantity") // 跟踪属性quantity
// //
// // product.quantity = 5
// // trigger("quantity") // total: 25, 动态更新了，依赖跟踪成功

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
// // effect()
// // track(product, "price")
// //
// // product.price = 6
// // trigger(product, "price")

/********** 属性被get时，触发track方法 ****************/
/********** 属性被set时，触发trigger方法 **************/
/**** 如何对getter和setter进行拦截？Proxy/Reflect *****/
/********************* V4 **************************/
let product = { price: 5, quantity: 2 }
let proxyProduct = new Proxy(product, {
    get(target, key, receiver) {
        // 将Proxy中的receiver传入Reflect，保证Reflect中的this
        Reflect.get(target, key, receiver)

    }
})