// const http = require('http')
// const querystring = require('querystring')

// const server = http.createServer((req,res) => {
//     const method = req.method
//     const url = req.url
//     const path = url.split('?')[0]
//     const query = url.split('?')[1]
//     //设置返回格式为JSON
//     res.setHeader('Content-type','application/json')
//     //返回的数据
//     const resData ={
//         method,
//         url,
//         path,
//         query
//     }
//     //返回
//     if (method === "GET"){
//         //返回
//         res.end(
//             JSON.stringify(resData) //stringify是把对象转换成字符串格式，字符串是json格式
//         )
//     }  
//     if (method === 'POST'){
//         let postData=''
//         触发data事件
//         req.on('data',chunk=>{
//             postData+=chunk.toString()
//         })
//         req.on('end',()=>{
//             resData.postData=postData //把postData加到resData中
//             //返回
//             res.end(
//                 JSON.stringify(resData)
//             )
//         })
//     }
// })

// server.listen(8000)
// console.log('OK')


const http = require('http')
const fs = require('fs')
const handleBlogRouter = require('../blog-1/src/router/blog')
//14、引入url包
var url = require('url')
var querystring = require('querystring')

//9、handle传进去
function startServer(route,handle){
    const server = http.createServer((req,res) => {
        //15、定义pathname，只要url中问号前面的部分，不要后面的部分
        var pathname = url.parse(req.url).pathname
        console.log('done '+pathname)
        //16、定义params，将问号后面的参数取出来。true是对象，fasle是字符串
        //var params = url.parse(req.url,true).query
        //1、route函数是从外面传进来的
        //10、handle传进去
        //11、将res传进去
        //route(handle,pathname,res,params)  
        
        //17、post表单方法
        var data = []
        req.on("error", (err) => {
            console.error(err)
        }).on('data', (chunk) => {
            data.push(chunk)
            console.log('传入的data是： ',data)
        }).on('end', () => {
            console.log('???????????????')
            // route(handle,pathname,res,data)
            if (req.method === 'POST') {
                data = Buffer.concat(data).toString()
                route(handle,pathname,res,data)//接收完数据就把数据传到处理的函数中querystring.parse(data
                console.log('>>>>>>>>>>')
            } else {
                var params = url.parse(req.url,true).query
                route(handle,pathname,res,params)
                console.log('**********')
            }
        }) 
    })
    
    server.listen(3000)
    console.log('server start')
}

module.exports.startServer = startServer