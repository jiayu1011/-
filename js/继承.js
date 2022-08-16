/**
 * ES5 Version
 */

/**
 * 原型链继承
 */
function ES5_ProtoChain_Person(name){
    this.name = name
}
ES5_ProtoChain_Person.prototype.getName = function (){
    console.log(this.name)
}
function ES5_ProtoChain_Student(stuId){
    this.stuId = stuId
}

// *
// 行为：把子类原型对象指定为父类的一个新实例，这样子类实例在寻找父类的方法或者属性的时候，就可以沿着xxx.__proto__找到父类的实例，再继续向上找就是父类.prototype
// 缺点：1、父类实例中的属性会被挂在子类的原型对象上，如果是引用数据类型（如数组），则父类实例在修改时，子类也会收到影响
//      2、无法传参
ES5_ProtoChain_Student.prototype = new ES5_ProtoChain_Person('ES5_ProtoChain_xin')

// 修正constructor指向
ES5_Constructor_Student.prototype.constructor = ES5_Constructor_Student


var es5_protochain_stu = new ES5_ProtoChain_Student(123)
es5_protochain_stu.getName()


/**
 * 构造函数继承
 */
function ES5_Constructor_Person(name){
    this.name = name
}
ES5_Constructor_Person.prototype.getName = function (){
    console.log(this.name)
}

function ES5_Constructor_Student(stuId){
    this.stuId = stuId

    // *
    // 行为：在子类构造函数中执行父类构造函数
    // 优点：可以实现多继承，子类构造函数也可以向父类构造函数传参
    // 缺点：父类构造函数中的行为可以生效，但和父类原型并无直接联系；只能继承实例的属性/方法，无法继承原型对象的属性/方法
    ES5_Constructor_Person.call(this, 'ES5_Constructor_xin')
}
var es5_constructor_stu = new ES5_Constructor_Student(123)
// es5_constructor_stu.getName()会报错，因为是挂载在父类对象上的方法
console.log(es5_constructor_stu.name)


/**
 * 组合继承（将原型链继承和构造函数继承组合）
 */
function ES5_Combine_Person(name){
    this.name = name
}
ES5_Combine_Person.prototype.getName = function (){
    console.log(this.name)
}

function ES5_Combine_Student(stuId){
    this.stuId = stuId
    ES5_Combine_Person.call(this, 'ES5_Combine_xin')
}

// *
// 行为：原型链继承+构造函数继承
// 优点：集两者优点
// 缺点：调用了两次父类构造函数，创建了两份实例，内存占用较大
ES5_Combine_Student.prototype = new ES5_Combine_Person()
ES5_Combine_Student.prototype.constructor = ES5_Combine_Student

var es5_combine_stu = new ES5_Combine_Student(123)
es5_combine_stu.getName()

/**
 * 寄生组合继承
 */



/**
 * 实例继承
 */
function ES5_Instance_Person(name){
    this.name = name
}
ES5_Instance_Person.prototype.getName = function (){
    console.log(this.name)
}
// *
// 行为：返回父类的实例
// 优点：不限制调用类型，可以是new 子类()，也可以是 子类()
function ES5_Instance_Student(name, stuId){
    var instance = new ES5_Instance_Person(name)
    instance.stuId = stuId
    return instance
}

var es5_instance_stu = ES5_Instance_Student('ES5_Instance_xin', 123)
es5_instance_stu.getName()







/**
 * ES6 Version
 */
// class Person{
//     constructor(name) {
//         this.name = name
//     }
//
// }
//
// class Student extends Person{
//     constructor(name, sid) {
//         super(name);
//         this.sid = sid
//     }
//
//     saySId(){
//         console.log(this.sid)
//     }
// }
//
// const s1 = new Student('嘉宇', 2018)
// s1.saySId()
// console.log('s1', s1)
//
// class Teacher extends Person{
//     constructor(name, subject) {
//         super(name);
//         this.subject = subject
//     }
//
//     saySubject(){
//         console.log(`my subject is ${this.subject}`)
//     }
// }
// const t1 = new Teacher('饶sir', 'English')
// t1.saySubject()
// console.log('t1', t1)