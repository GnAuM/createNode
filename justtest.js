const http = require('http');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const server = http.createServer(async(request,response)=>{

    var content =""; 
    const {method,url} = request;
    if(method ==="GET" && url ==='/'){
        try {
            content = fs.readFileSync(path.resolve('files','home.md'),'utf-8')
            content = marked(content);
        } catch (error) {
            console.error(error);
        }
        response.statusCode = 200;
        response.setHeader('Content-Type' ,'text/html; charset=UTF-8');
        response.end(content);
    }else if (method ==="GET" && url ==='/about'){
        response.setHeader('Content-Type' ,'text/html; charset=UTF-8');
        response.statusCode = 200;
        response.end(content);
    }




});

server.listen(8888);

