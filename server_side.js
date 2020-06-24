//  javascript is in strict mode => throws more errors and could give better performance
'use strict';

const http      = require('http');
const fs        = require('fs');
const url       = require('url');

//  loopback address, bounces stuff to your own machine
const hostname  = '0.0.0.0';
//  ruby-on-rails default, better change it
const port      = 3000;

//  create http server, retrieve id and have it send the correct json through http
const server    = http.createServer((request, response) =>
{
//  myURL is (baseURL + request.url) in order to form a correct WHATWG URL
    var baseURL = 'http://' + request.headers.host;
    var myURL   = new URL(request.url, baseURL);
    var id      = myURL.searchParams.get('id');
    console.log(id);

//  readFileSync imposes program halting till file is read
//  Error handling if file is missing (ENOENT) or not permitted (EACCES), otherwise throw err
//  If error in syscall is not handled, everything will crash <3
    try
    {
//      switch ids
        switch(id)
        {
            case(1):
                let rawData  = fs.readFileSync('data1.json');
                break;
            case(2):
                let rawData  = fs.readFileSync('data2.json');
                break;
            case(3):
                let rawData  = fs.readFileSync('data3.json');
                break;
            default:
                break;
        }
        response.statusCode  = 200;
        response.setHeader('Content-Type', 'application/json');
        response.write(rawData);
    } catch(err)
    {
        if(err.code === 'ENOENT')
        {
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/plain');
            response.write('404 - file not found!');
        }
        else if(err.code === 'EACCES')
        {
            response.statusCode = 403;
            response.setHeader('Content-Type', 'text/plain');
            response.write('403 - file reading permission denied!');
        }
        else
        {
            throw err;
        }
    }
    response.end();
});

//  function called on server listening gives basic info about server
server.listen(port, hostname, () =>
{
    console.log(`Server running at http://${hostname}:${port}/`);
});
