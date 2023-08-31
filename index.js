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
const TempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const TempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const TempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')

const server = http.createServer((req,res)=>{
    //console.log(req.url);
    const pathName = req.url;



    if(pathName === '/'|| pathName === '/overview'){
        res.writeHead(200,{'Content-type': 'text/html'});
        const Cards = dataObj.map(ele => replaceTemplate(TempCard, ele)).join('');
        const output = TempOverview.replace('{%PRODUCT_CARDS%}', Cards)
        res.end(output)
        



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
server.listen(5990,()=>{
    console.log(`Listennig yo requests on port: 5000`);
})

const replaceTemplate = (temp,product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
    output = output.replace(/{%IMAGE%}/g,product.image)
    output = output.replace(/{%PRICE%}/g,product.price)
    output = output.replace(/{%FROM%}/g,product.from)
    output = output.replace(/{%QUANTITY%}/g,product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g,product.description)
    output = output.replace(/{%ID%}/g,product.id)
    if(!product.automatic) output = output.replace(/{%NOT_AUTOMATIC%}/g, 'not-automatic')
    return output
}