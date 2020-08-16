//该文件处理数据，无req和res相关，只关心数据
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

const getDetail = (id) => {
    //先返回假数据（格式是正确的）
    return [
        {
            id :1,
            title:'标题A', 
            content :'内容A',
            createTime :1594377119126,
            author:'zhangsan'
        }
    ]
}

// ES6新语法，做个兼容，如果参数blogData没有的话，={}默认给个空对象
const newBlog = (blogData = {}) => {
    // blogData是一个博客对象，包含title content属性 
    // console.log('new blogData:',blogData)
    return {
        id:3   // 表示新建博客，插入到数据表里面的id。返回的对象
    }   
}

const updateBlog = (id,blogData = {}) => {
    // id 就是要更新博客的id
    // blogData是一个博客对象，包含title content属性 
    // console.log(`id: ${id}, blogData: ${blogData}`)
    // console.log('update blog',id, blogData)
    return true // true 更新成功
}

const delBlog = id => {
    // id 就是要删除的id
    return true
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
//返回对象是因为以后可能有更多的函数