const http = require('http')
const PORT=8000
//引入模块
const serverHandle = require('../app')

const server=http.createServer(serverHandle)

server.listen(PORT)
