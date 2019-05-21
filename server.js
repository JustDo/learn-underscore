const http = require('http');
const server = new http.Server();


//开启服务
// var server = http.createServer(function(req, res){
//     //开启服务后具体做什么
//     res.end('hello world')
// }).listen(3001);

server.on('request', function(req, res) {
    var path = req.url;
    res.setHeader('aaa','bbb')
    res.setHeader('xxx','yyy');
    //只能调用一次
    res.writeHead(200,{'content-type':'text/html;charset=utf-8'})

    console.log(req.httpVersion);
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    switch (path) {
        case '/':
            res.end('<a href="./second">index</a>');
            break;
        case '/second':
            res.end('<a href="/">首页</a>');
            break;
        default:
            res.end('404');
            break;

    }
    res.end('hello world');
})
//connection事件会在 request 事件前出发
server.on('connection',function(){


})
//错误处理
server.error('error',function(err){
    console.log(err);
})
//超时处理
server.setTimeout(2000,function(){
    console.log('超时')
})
server.listen(3001);
