/*
请写出下面ES6代码编译后所生成的ES5代码；

class Person {
     constructor (name) {
          this.name = name;
     }
     greet () {
          console.log(`Hi, my name is ${this.name}`);
     }
     greetDelay (time) {
          setTimeout(() => {
               console.log(`Hi, my name is ${this.name}`);
          }, time);
     }
}
 */

class Person {
    constructor (name) {
        this.name = name;
    }
    greet () {
        console.log(`Hi, my name is ${this.name}`);
    }
    greetDelay (time) {
        setTimeout(() => {
            console.log(`Hi, my name is ${this.name}`);
        }, time);
    }
}


function ES5_Person(name){
    this.name = name
}

ES5_Person.prototype.greet = function() {
    console.log(`Hi, my name is ${this.name}`);
}
ES5_Person.prototype.greetDelay = function(time) {
    setTimeout(() => {
        console.log(`Hi, my name is ${this.name}`);
    }, time);
}

let t = new ES5_Person('xin')
t.greet()
t.greetDelay(1000)
