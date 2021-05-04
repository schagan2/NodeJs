const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('Request made for the url: '+req.url);

    let path = './views/';
    switch(req.url){
        case '/': 
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/restaurant':
            path += 'restaurant.html';
            res.statusCode = 200;
            break;
        default:
            path += 'error.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.end(data);
        }
    });
});

server.listen(8080, 'localhost', () => {
    console.log('Listening for the request');
});