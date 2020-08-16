//这个文件完全是createServer的逻辑，跟业务代码没有任何关系
const http = require('http')
const PORT=8000
//引入模块
const serverHandle = require('../app')

const server=http.createServer(serverHandle)

server.listen(PORT)
