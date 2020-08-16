const http = require('http')//引入http模块

const server = http.createServer((req, res) => {
    res.writeHead(200,{'content-type':'text/html'})
    res.end('<h1>hello world</h1>')
})
//createServer 要传入一个函数进去，最后返回hello world
server.listen(3000,() =>{
    console.log('listening on 300 port')
})

