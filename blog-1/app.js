//app.js系统基础的功能和设置
const querystring =require('querystring')//js原生模块
//将blog和user的接口模块引入进来
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { resolve } = require('path')

// 6. 用于处理 post data，新定义一个函数
const getPostData = req => {
    const promise = new Promise ((resolve,reject) => {
        if (req.method !== 'POST') {
            // 如果是get请求，直接返回一个空就可以，不用处理什么数据
            resolve({})
            return 
        } 
        // 传入数据格式不对的话，也返回空
        if (req.headers['content-type'] != 'application/json') {
            resolve({})
            return 
        }
        // 正式进入数据处理
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end',() => {
            // 先判断如果没有任何数据，也是resolve一个空数据
            if (!postData){
                resolve({})
                return 
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise  //  OK  写完了怎么用这个函数呢？得在处理所有路由之前
}

//写回调函数
const serverHandle = (req,res)=>{
    //设置返回格式是字符串，字符串是JSON格式
    res.setHeader('Content-type','application/json')
    
    //4. 获取path，统一在外面获取path：因为观察到blog.js和user.js都定义了一下这个，所以抽出来放在主函数里
    const url = req.url
    req.path = url.split('?')[0]  //直接将req.path 赋值成路由地址。那么就不需要在blog.js user.js中重新去计算path了

    //5. 解析query，公共方法都放在app.js里去写
    req.query = querystring.parse(url.split('?')[1]) //url中的query以对象的形式放在req.query中

    // 7.处理post data
    getPostData(req).then(postData => {
        req.body = postData
        // 8. 然后把处理路由的步骤放进来，所有的路由都可以通过req.body来获取postData

        // 1. 处理blog路由
        const blogData = handleBlogRouter(req,res) //调用处理blog路由的函数，并传入参数，返回一个值，blogData是对象，因为这个函数的返回值就是对象
        //如果有值，那么结束并返回blogData（顺便从对象转换成字符串）
        if (blogData){
            res.end(
                JSON.stringify(blogData)
            )
            return //不加return 会继续往下执行
        }
        // 2. 处理user路由，命中返回值
        const userData = handleUserRouter(req,res)
        if (userData){
            res.end(
                JSON.stringify(userData)
            )
            return 
        }
        // 3. 未命中路由返回404
        res.writeHead(404,{'Content-type':'text/plain'})  //写个头，改成404 和 纯文本
        res.write('404 Not Found \n')  //内容是这个
        res.end()  // end 后面不用写什么了，因为上面已经写了内容了
    })
}

//通过commonjs的模块范规划把它输出
module.exports=serverHandle
//process.env.NODE_ENVres.end