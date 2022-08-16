const data = {
    name: {
        value: "123"
    },
    age: 189,
    arr: [1, 2, 3],
};

const oldArrayProto = Array.prototype;
const newArrayProto = Object.create(oldArrayProto);
const arrayMethods = ["push", "pop", "shift", "unshift", "splice"];
arrayMethods.forEach((method) => {
    newArrayProto[method] = function () {
        // 绑定到Array.prototype上的方法，相当于加一层拦截器，Vue3中用Proxy
        console.log("更新视图操作...")
        oldArrayProto[method].call(this, ...arguments);
    }
});

function observer (target) {
    if (typeof target !== "object" || target === null) {
        return target
    }
    for (const key in target) {
        if (typeof target[key] === "object") {
            if (Array.isArray(target[key])) {
                target[key].__proto__ = newArrayProto;
            } else {
                // 递归深度监听，处理嵌套对象
                observer(target[key]);
            }
        } else {
            defineReactive(target, key);
        }
    }
}

// 响应式数据处理
function defineReactive (target, key) {
    // 使用访问器
    Object.defineProperty(target, key, {
        get () {
            return target[key];
        },
        set (newValue) {
            target[key] = newValue;
            console.log("更新视图操作...");
        }
    })
}

// 变成响应式数据
observer(data);

data.arr.pop();


