/*
给定一个包含非负整数的 M x N 迷宫，请找出一条从左上角到右下角的路径，使得路径上的数字总和最小。每次只能向下或者向右移动一步。


输入描述:
第一行包含两个整数M和N，以空格隔开，1≤N≤10，1≤N≤10。

接下来的M行中，每行包含N个数字 。




输出描述:
找出总和最小的路径，输出路径上的数字总和。


输入例子1:
3 3
1 3 1
1 5 1
4 2 1

输出例子1:
7

 */

const solution = (M, N, matrix) => {
    let dp = new Array(M).fill(new Array(N).fill(Infinity))
    dp[0][0] = matrix[0][0]
    for(let i=0;i<M;i++){
        for(let j=0;j<N;j++){
            // 定义dp[i][j]为走到(i,j)所需要的最小花费
            // 只能向下或向右走
            if(i===0 && j===0) continue
            if(i===0){
                dp[i][j] = dp[i][j-1] + matrix[i][j]
            }
            else if(j===0){
                dp[i][j] = dp[i-1][j] + matrix[i][j]
            }
            else {
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + matrix[i][j]
            }
        }
    }

    return dp[M-1][N-1]

}


let matrix = []
let line = readline().split(' ').map(Number)
let M = line[0], N = line[1]
for(let i=0;i<M;i++){
    line = readline().split(' ').map(Number)
    matrix.push(line)
}

console.log(solution(M, N, matrix))