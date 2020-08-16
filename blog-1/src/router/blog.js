//该文件，解析路由，和req和res相关逻辑放到这个文件中
// 1. 通过解构的方式引用函数
const { getList, 
        getDetail,
        newBlog,
        updateBlog,
        delBlog
    } = require('../controller/blog')
const { SuccessModel,ErrorModel} = require('../model/resModel')

const handleBlogRouter =(req,res) => {
    const method = req.method //GET POST
    // const url = req.url
    // const path = url.split('?')[0]
    const id = req.query.id

    //获取博客列表
    if (method ==='GET' && req.path ==='/api/blog/list') {
        //2. getList函数需要两个参数 author和keyword，所以在这里用的时候也要先拿到这两个参数，在app.js中已经把author keyword放在req.query中去了
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author,keyword) //返回数组，放到变量中listData
        return new SuccessModel(listData)  //data=listData , errno=0

        // return {            
        //     msg:'这是获取博客列表的接口'
        // }  //return的是对象
    }
    //获取博客详情
    if (method ==='GET' && req.path ==='/api/blog/detail') {
        // const id = req.url.id  将id提到上面去，就可以通用了
        const data = getDetail(id)
        return new SuccessModel(data)
        // return {
        //     msg:'这是获取博客详情的接口'
        // }
    }
    //新建一篇博客
    if (method === 'POST' && req.path ==='/api/blog/new') {
        const blogData = req.body
        const data = newBlog(blogData)
        return new SuccessModel(data)
        // return {
        //     msg:'这是新建博客的接口'
        // }
    }
    //更新一篇博客
    if (method === 'POST' && req.path ==='/api/blog/update') {
        const result = updateBlog(id, req.body)
        // result是true或者false，所以下面可以直接判断是true还是false
        if (result) {
            return new SuccessModel()
        } else{
            return new ErrorModel('更新博客失败')
        }
        // return {
        //     msg:'这是更新博客的接口'
        // }
    }
    //删除一篇博客
    if (method === 'POST' && req.path ==='/api/blog/del') {
        const result = delBlog(id) // 将id传入
        if (result) {
            return new SuccessModel()
        } else{
            return new ErrorModel('删除博客失败')
        }
        // return {
        //     msg:'这是删除博客的接口'
        // }
    }
}
//将函数输出
module.exports=handleBlogRouter