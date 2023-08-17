const { log } = require('console');
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
//////////////////////////////////////////////////////////////////7//
//$$ syncronous way - blocking  ####################

/* const textIn = fs.readFileSync('./txt/avocado.txt','utf-8')
console.log(textIn);
const textOut = `Thiids is somethin that we want to add to the text:${textIn}./nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut)
console.log('File written!');
const hello = "Hello World"
console.log(hello); */

/////////////////////////////////////////////////////////////////////
//$$ Non-Blocking asyncronous  

/* fs.readFile('./txt/star.txt' ,'utf-8',(err,data)=>{
    console.log("ERROR!");
    fs.readFile(`./txt/${data}.txt` ,'utf-8',(err,data2)=>{
        console.log(data2);  
        fs.readFile('./txt/avocado.txt' ,'utf-8',(err,data3)=>{
            console.log(data3);
            fs.writeFile('./txt/findal.txt',`${data2},${data3}`,'utf-8',err =>{
                console.log('Your file has been written');
            });
        });
    });  
});

console.log('Will read this first'); */



//////////////////////////////////////
//$$ Server
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const Server = http.createServer((req,res)=>{
    //console.log(req.url);
    const pathName = req.url;
    if(pathName === '/'|| pathName === '/overview'){
        res.end("This is the OVERViEW")
    }else if(pathName === '/product'){
        res.end('This is the PRODUCT')
    }else if(pathName === '/api'){
        res.writeHead(200,{'Content-type': 'application/json'});
        res.end(data);
    }else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header': 'hello world'
        });
        res.end('<h1>Page not Found</h1>')
    }

})
Server.listen(5000,'127.0.0.1',()=>{
    console.log(`Listennig yo requests on port: 5000`);
})
