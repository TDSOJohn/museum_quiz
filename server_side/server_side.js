//  RESTful API URL format: http://192.168.1.110/?id=n (n is integer {1, 2, 3})
//  client-side HTML retrieval URL format: http://192.168.1.110/client_side/webpage.html
//  javascript is in strict mode => throws more errors and could give better performance
'use strict';

//  HTTP, FileSystem and URL modules are required
const http      = require('http');
const fs        = require('fs');
const url       = require('url');
const path      = require('path');

const utilities = require('./utilities.js');

//  accept any connection to the correct port
const hostname  = '0.0.0.0';
//  ruby-on-rails default, better change it
const port      = 3000;

//  create http server, retrieve id and have it send the correct json through http
const server    = http.createServer((request, response) =>
{
//  myURL is (baseURL + request.url) in order to form a correct WHATWG URL
    let baseURL = 'http://' + request.headers.host;
    let myURL   = new URL(request.url, baseURL);
    let pathName= myURL.pathname;
    let id      = utilities.intParser(myURL.searchParams.get('id'));

    console.log(pathName);
    console.log(id);

    let mimeTypes       = {
        '.html' : 'text/html',
        '.js'   : 'text/javascript',
        '.css'  : 'text/css',
        '.json' : 'application/json',
        '.jpg'  : 'image/jpg',
        '.png'  : 'image/png',
        '.gif'  : 'image/gif',
        '.woff' : 'application/font-woff',
        '.ttf'  : 'application/font-ttf',
        '.eot'  : 'application/vnd.ms-fontobject',
        '.otf'  : 'application/font-otf'
    };
    // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    if(pathName !== '/')
    {
        try
        {
            let extName         = String(path.extname(pathName)).toLowerCase();

//          Back to "home" folder
            let relativePathName    = '../client_side' + pathName;
            console.log(relativePathName);
            let htmlData        = fs.readFileSync(relativePathName);

//          If no ContentType matches, send as binary stream
            let contentType     = mimeTypes[extName] || 'application/octet-stream';
            console.log(contentType);
            response.statusCode = 200;
            response.setHeader('Content-Type', contentType);
            response.write(htmlData);
        } catch (e)
        {
            utilities.errorHandler(e, response);
        }
    } else if(id > 0)
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
            console.log('json' + jsonPathName);
        } catch(err)
        {
            utilities.errorHandler(err, response);
        }
    }
    response.end();
});

//  function called on server listening gives some basic server info
server.listen(port, hostname, () =>
{
    console.log(`Server running at http://${hostname}:${port}/`);
});
