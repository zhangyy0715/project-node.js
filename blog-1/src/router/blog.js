//通过解构的方式引用函数
const { getList } = require('../controller/blog')
const { SuccessModel,ErrorModel} = require('../model/resModel')

const handleBlogRouter =(req,res) => {
    const method = req.method //GET POST
    // const url = req.url
    // const path = url.split('?')[0]

    //获取博客列表
    if (method ==='GET' && req.path ==='/api/blog/list') {
        //getList函数需要两个参数 author和keyword
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
        return {
            msg:'这是获取博客详情的接口'
        }
    }
    //新建一篇博客
    if (method === 'POST' && req.path ==='/api/blog/new') {
        return {
            msg:'这是新建博客的接口'
        }
    }
    //更新一篇博客
    if (method === 'POST' && req.path ==='/api/blog/update') {
        return {
            msg:'这是更新博客的接口'
        }
    }
    //删除一篇博客
    if (method === 'POST' && req.path ==='/api/blog/del') {
        return {
            msg:'这是删除博客的接口'
        }
    }
}
//将函数输出
module.exports=handleBlogRouter