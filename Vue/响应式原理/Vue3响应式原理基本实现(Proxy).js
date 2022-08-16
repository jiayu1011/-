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
            return Reflect.set(target, key, value, receiver);
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
console.log(proxyData);