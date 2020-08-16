var fs = require('fs')
//3、新建一个router处理文件
//11、handle传进去
//pathname是浏览器中的路径
//12、将res传进去
function route(handle,pathname,res,params){
     console.log('Routing a request for '+ pathname)
     if (typeof handle[pathname] ==='function') {
        handle[pathname](res,params)
     } else {
        res.writeHead(200,{'Content-Type':'text/html'})
        const myReadStream = fs.createReadStream(__dirname+'/404.html','utf8')
        myReadStream.pipe(res)
     }
}

module.exports.route = route 