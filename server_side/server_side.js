//  RESTful API URL format: http://192.168.1.110/?id=n (n is integer {1, 2, 3})
//  client-side HTML retrieval URL format: http://192.168.1.110/client_side/index.php
//  javascript is in strict mode => throws more errors and could give better performance
'use strict';

//  HTTP, FileSystem and URL modules are required
const http      = require('http');
const fs        = require('fs');
const url       = require('url');

//  accept any connection to the correct port
const hostname  = '0.0.0.0';
//  ruby-on-rails default, better change it
const port      = 3000;

//  create http server, retrieve id and have it send the correct json through http
const server    = http.createServer((request, response) =>
{
//  myURL is (baseURL + request.url) in order to form a correct WHATWG URL
    var baseURL = 'http://' + request.headers.host;
    var myURL   = new URL(request.url, baseURL);
    var pathName= myURL.pathname;
    var id      = myURL.searchParams.get('id');
    var type    = myURL.searchParams.get('type');
    console.log(pathName);
    console.log(id);
    console.log(type);

    if((type === 'null'))
    {
//      CREARE FUNZIONE
        try
        {
            relativePathName    = '..' + pathName;
            let htmlData        = fs.readFileSync(relativePathName);
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
            response.write(htmlData);
        } catch (e)
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
    } else
    {
//  RESTful API part
//  readFileSync imposes program halting till file is read
//  Error handling if file is missing (ENOENT) or access is not permitted (EACCES), otherwise throw err
//  If error in syscall is not handled, everything will crash <3
        try
        {
//  Build jsonPathName from id and try to readSync it
            let jsonPathName    = `data${id}.json`;
            let rawData         = fs.readFileSync(jsonPathName);

            response.statusCode = 200;
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
    }
    response.end();
});

//  function called on server listening gives some basic server info
server.listen(port, hostname, () =>
{
    console.log(`Server running at http://${hostname}:${port}/`);
});
