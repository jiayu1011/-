const a = 1

const obj = {
    a: 2,
    show1: function (){
        console.log(this.a)
    },
    show2: () => {
        console.log(this.a)
    }
}

obj.show1() // 隐式绑定, 使用了obj作为上下文, this指向obj
obj.show2()

const f1 = obj.show1
const f2 = obj.show2

f1()
f2()

// const tempFunc = () => {
//     console.log(this.a)
// }
//
// tempFunc()