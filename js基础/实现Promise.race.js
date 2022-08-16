class MyPromise{
    race(promiseArr){
        return new Promise(((resolve, reject) => {
            for(let index in promiseArr){
                Promise.resolve(promiseArr[index]).then(val => {
                    resolve(val)
                }).catch(err => {
                    reject(err)
                })
            }
        }))
    }
}


let promise1 = new Promise(((resolve, reject) => {
    setTimeout(() => {
        resolve('1')
    }, 1000)
}))

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('2')
        // reject('reject reason')
    }, 500)
})

let mypromise = new MyPromise()

mypromise.race([promise1, promise2]).then(val => {
    console.log(val)
})