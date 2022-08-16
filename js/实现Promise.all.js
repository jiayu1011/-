function MyPromise(){

}

MyPromise.prototype.all = function (promiseArr){

    return new Promise((resolve, reject) => {
        let promiseNum = promiseArr.length
        let resultArr = new Array(promiseNum)
        let resolveCount = 0
        for(let index in promiseArr){
            Promise.resolve(promiseArr[index]).then(val => {
                resolveCount++
                resultArr[index] = val

                if(resolveCount===promiseNum){
                    return resolve(resultArr)
                }
            }).catch(err => {
                return reject(err)
            })

        }
    })


}


let promise1 = new Promise(((resolve, reject) => {
    setTimeout(() => {
        resolve('2')
    }, 1000)
}))

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('3')
        // reject('reject reason')
    }, 500)
})

let mypromise = new MyPromise()
mypromise.all([promise1, promise2]).then(val => {
    console.log(val)
})