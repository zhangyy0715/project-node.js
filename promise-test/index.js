const fs = require('fs')
const path = require('path')  // 路径模块

// // 封装函数callback方式获取一个文件内容
// function getFileContent(fileName, callback) {
//     // 拼绝对路径，用path的resolve方法，__dirname是当前文件目录
//     const fullFileName = path.resolve(__dirname,'files',fileName)
//     fs.readFile(fullFileName, (err,data) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         callback(
//             // data读出来默认是二进制的格式，要转成字符串
//             // 再将其变成对象，输出对象格式的数据
//             JSON.parse(data.toString())
//         )      
//     })
// }

// // 测试 callback-hell 回调地狱========用promise
// getFileContent('a.json', aData => {
//     console.log('a data:', aData)  // a adata:  { next: 'b.json', msg: 'this is a' } 里面next的key是下一个文件名
//     getFileContent(aData.next, bData => {
//         console.log('b data:' ,bData)
//         getFileContent(bData.next, cData => {
//             console.log('c data:', cData)
//         })
//     })
// })

// 用promise获取文件内容
function getFileContent(fileName) {
    // 通过new Promise来定义一个promise
    const promise = new Promise((resolve,reject) => {
        const fullFileName = path.resolve(__dirname,'files',fileName)
        fs.readFile(fullFileName, (err,data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )      
        })
    })
    return promise
}

getFileContent('a.json')
    .then(aData => {
        console.log('a data',aData)
        return getFileContent(aData.next)
    })
    .then(bData => {
        console.log('b data',bData)
        return getFileContent(bData.next)
    })
    .then(cData => {
        console.log('c data',cData)
    })