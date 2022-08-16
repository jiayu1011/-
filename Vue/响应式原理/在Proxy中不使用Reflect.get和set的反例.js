const reactive = (target) => {
    const handler = {
        get(target, key, receiver) {
            console.log(`handle get ${key}`)
            track(target, key)
            // 将Proxy中的receiver传入Reflect，保证Reflect中的this指向的是Proxy代理的对象
            // return Reflect.get(target, key, receiver)
            return target[key]
        },
        set(target, key, value, receiver) {
            console.log(`handle set ${key}`)
            // Reflect.set(target, key, value, receiver)
            target[key] = value
            trigger(target, key)
        }
    }
    return new Proxy(target, handler)
}

const targetMap = new WeakMap(); // WeakMap可以使用Object作为key
let product = reactive({
    price: 5,
    quantity: 2,
    get myPrice () { return this.price }, // 访问器中的this会指向原始对象，从而造成非响应式更新
    set myPrice (value) { this.price = value },
})
let total = 0

const effect = () => {
    total = product.price * product.quantity
}

const track = (target, key) => {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }

    dep.add(effect)
}

const trigger = (target, key) => {
    let depsMap = targetMap.get(target)
    if (!depsMap) return
    let dep = depsMap.get(key)
    if (!dep) return

    dep.forEach(effect => effect())
}

effect()
console.log(total)
product.myPrice = 10
console.log(total)
