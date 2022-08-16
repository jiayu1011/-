function tArray(){
    let arr = []
    for(let index in arguments){
        arr.push(arguments[index])
    }
    return arr
}

let test = tArray([1,1,1], [2,2,2], [3,3,3])
console.log(test)