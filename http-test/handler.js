var fs = require('fs')
//6、再新建一个文件操纵这些请求
//13、将res传进去，并将具体的函数处理写完整
function home(res) {
    //console.log('Executing "home" handler')
    res.writeHead(200,{'Content-Type':'text/html'})
    const myReadStream = fs.createReadStream(__dirname+'/index.html','utf8')
    myReadStream.pipe(res)
}

function review(res) {
    //console.log('Executing "review" handler')
    res.writeHead(200,{'Content-Type':'text/html'})
    const myReadStream = fs.createReadStream(__dirname+'/review.html','utf8')
    myReadStream.pipe(res)
}

function api_record(res,params) {
    //console.log('Executing "api_record" handler')
    res.writeHead(200,{'Content-Type':'application/json'})
    // const myObj = {
    //     name :'zhangyy',
    //     age :29,
    // }
    res.end(JSON.stringify(params))
}

module.exports = {
    home,
    review,
    api_record
} 