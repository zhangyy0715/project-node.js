const querystring =require('querystring')//js原生模块
//将blog和user的接口模块引入进来
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


//写回调函数
const serverHandle = (req,res)=>{
    //设置返回格式是字符串，字符串是JSON格式
    res.setHeader('Content-type','application/json')
    
    //获取path，统一在外面获取path
    const url = req.url
    req.path = url.split('?')[0]  //直接将req.path 赋值成路由地址。那么就不需要在blog.js user.js中重新去计算path了

    //解析query，公共方法都放在js里去写
    req.query = querystring.parse(url.split('?')[1]) //url中的query以对象的形式放在req.query中

    //处理blog路由
    const blogData = handleBlogRouter(req,res) //调用处理blog路由的函数，并传入参数，返回一个值，blogData是对象，因为这个函数的返回值就是对象
    //如果有值，那么结束并返回blogData（顺便从对象转换成字符串）
    if (blogData){
        res.end(
            JSON.stringify(blogData)
        )
        return //不加return 会继续往下执行
    }
    //处理user路由
    const userData = handleUserRouter(req,res)
    if (userData){
        res.end(
            JSON.stringify(userData)
        )
        return 
    }
    //未命中路由返回404
    res.writeHead(404,{'Content-type':'text/plain'})  //写个头，改成404 和 纯文本
    res.write('404 Not Found \n')  //内容是这个
    res.end()
}

//通过commonjs的模块范规划把它输出
module.exports=serverHandle
//process.env.NODE_ENVres.end