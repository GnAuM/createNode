require('dotenv').config();
const http = require('http');
const mysql2 = require('mysql2');

const {MYSQL_USERNAME,MYSQL_PASSWORD,MYSQL_HOSTNAME,MYSQ_PORT,MYSQL_DB} =process.env;
const connection = mysql2.createConnection({   // config ค่าการเชื่อมต่อฐานข้อมูล
    host     : MYSQL_HOSTNAME, 
    user     : MYSQL_USERNAME,
    password : MYSQL_PASSWORD,
    database : MYSQL_DB
})
    

const server = http.createServer((request,response)=>{
    
    
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
    }




});

server.listen(8888);

