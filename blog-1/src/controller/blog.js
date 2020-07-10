const getList = (author,keyword)=>{
    //先返回假数据（格式是正确的）
    //返回一个数组，一个数组代表一个博客
    return [
        {
            id :1,
            title:'标题A',
            content :'内容A',
            createTime :1594377119126,
            author:'zhangsan'
        },
        {
            id :2,
            title:'标题B',
            content :'内容B',
            createTime :1594378156255,
            author:'LISI'
        }
    ]
}
module.exports = {
    getList
}
//返回对象是因为以后可能有更多的函数