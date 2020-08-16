//启动文件
const server = require('./server')
//4、将router引入进来
const router = require('./router')
//7、引入handler.js，并解包，然后定义handle
const { home,review,api_record } = require('./handler')

//key是路径，value是函数
handle = {
    '/' : home,
    '/home' : home,
    '/review' : review,
    '/api/v1/records' : api_record
}
//handle = { home,review,api_record }
// console.log(handle)
// console.log(handle['/'])
// console.log(handle['/home']())

//2、再传一个route进去
//5、将route改成router.route
//8、将handle传进去
server.startServer(router.route,handle)