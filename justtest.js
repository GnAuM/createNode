require('dotenv').config();
const http = require('http');
const mysql2 = require('mysql2');
const fs =require('fs');
const fs1 =require('fs/promises');
const path = require('path');
const {MYSQL_USERNAME,MYSQL_PASSWORD,MYSQL_HOSTNAME,MYSQ_PORT,MYSQL_DB} =process.env;
const connection = mysql2.createConnection({   // config ค่าการเชื่อมต่อฐานข้อมูล
    host     : MYSQL_HOSTNAME, 
    user     : MYSQL_USERNAME,
    password : MYSQL_PASSWORD,
    database : MYSQL_DB
})
    

const server = http.createServer(async(request,response)=>{
    
     
    var content =""; 
    const {method,url} = request;
    if(method ==="GET" && url ==='/'){
        
        connection.query("select * from books",(error,res)=>{
            if(!!error){
                console.log(error)
            }else{
                for (let i = 0; i < res.length; i++) { 
                    content=content+"<p>"+res[i].bookName+"</p>";
                }
                response.statusCode = 200;
                response.setHeader('Content-Type' ,'text/html; charset=UTF-8');
                response.end(content);
            }
            
        });

       
    }else if (method ==="GET" && url ==='/about'){
        response.setHeader('Content-Type' ,'text/html; charset=UTF-8');
        response.statusCode = 200;
        response.end(content);
    }else if(method ==="GET" && url ==='/readFile'){
        var textFile ;
        try {
            textFile = fs.readFileSync(path.resolve('files','home.txt'),'utf-8');
        } catch (error) {
            console.error(error)
        }
        response.setHeader('Content-Type' ,'text/html; charset=UTF-8');
        response.statusCode = 200;
        response.end(textFile);
    }else if(method ==="GET" && url ==='/readDigital'){
        // เขียนcontent ลงไฟล์
        const logContent =`${new Date()}:${method}${url}\n`
        fs.writeFileSync('request.log',logContent,{flag:'a+'});
        response.end("OK");
    }else if (method ==="GET" && url ==='/fileFolder'){
        
       try {
           await fs1.stat('logs');
       } catch (error) {
           try {
               await fs1.mkdir('logs')
           } catch (error2) {}
       }
       const logContent =`${new Date()}:${method}${url}\n`
       await fs1.writeFile(path.join('logs','request.log'),logContent,{flag:'a+'});
        response.end("OK");
    }




});

server.listen(8888);

