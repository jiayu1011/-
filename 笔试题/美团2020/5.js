/*
形如1, 1, 2, 3, 5, 8, 13, 21, 34, 55的数列，后一位是前面两位相加（斐波那契数列），写出函数要求找到第 N 位是多少，如：fib(3) => 3 ， fib(5) => 8, 要求时间复杂度为O(n)。


输入描述:
输入一个正整数N（0<=N<=50）


输出描述:
输出第n项的数值


输入例子1:
3

输出例子1:
3

输入例子2:
5

输出例子2:
8
*/

let n = parseInt(readline())
const fib = (n) => {
    let f = new Array(n)
    f[0] = 1
    f[1] = 1
    if(n<=1) return f[n]

    for(let i=2;i<n;i++){
        f[i] = f[i-2] + f[i-1]
    }

    return f[n]

}

console.log(fib(n))