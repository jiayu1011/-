const str = 'good morning miss huang'

let arr1 = str.split(' ')
for(let index in arr1){
    arr1[index] = arr1[index].split('').reverse().join('')
}
let res = arr1.join(' ')
console.log(res)

// const res1 = str.split(' ').map(item => item.split('').reverse().join('')).join(' ')
const res1 = str.split(' ').map((value, index) => value.split('').reverse().join('')).join(' ')
console.log(res1)


