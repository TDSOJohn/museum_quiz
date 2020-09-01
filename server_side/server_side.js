//  RESTful API URL format: http://192.168.1.110/?id=n (n is integer {1, 2, 3})
//  client-side HTML retrieval URL format: http://192.168.1.110/client_side/webpage.html
//  javascript is in strict mode => throws more errors and could give better performance
'use strict';

//  HTTP, FileSystem and URL modules are required
const http      = require('http');
const fs        = require('fs');
const url       = require('url');
const path      = require('path');

//  npm dependencies
var QRCode      = require('qrcode');

const utilities = require('./utilities.js');
const dbFolder  = './database/';

//  accept any connection to the correct port
const hostname  = '0.0.0.0';
//  ruby-on-rails default, better change it
const port      = 3000;

var mimeTypes       = {
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


//  create http server, retrieve id and have it send the correct json through http
const server    = http.createServer((request, response) =>
{
    const { method, url }   = request;
    const { headers }       = request;

//  myURL is (baseURL + request.url) in order to form a correct WHATWG URL
    let baseURL     = 'http://' + request.headers.host;
    let myURL       = new URL(request.url, baseURL);
    let pathName    = myURL.pathname;
    let id          = utilities.intParser(myURL.searchParams.get('id'));
    let queryType   = myURL.searchParams.get('type');

    console.log(method);
    console.log(myURL);

//  If method is GET, it is access to file or to RESTful API
    if(method =='GET')
    {
//  If pathname is path to a resource, try to fetch it and send it to the client
        if(pathName !== '/')
        {
            try
            {
                let extName         = String(path.extname(pathName)).toLowerCase();

//  Back to "home" folder ( /client_side )
                let relativePathName= '../client_side' + pathName;
                console.log(relativePathName);
                let htmlData        = fs.readFileSync(relativePathName);

//  If no ContentType matches, send as binary stream
                let contentType     = mimeTypes[extName] || 'application/octet-stream';
                console.log(contentType);
                response.statusCode = 200;
                response.setHeader('Content-Type', contentType);
                response.write(htmlData);
                response.end();
            } catch (e)
            {
                utilities.errorHandler(e, response);
            }
        } else if(id >= 0)
        {
//  RESTful API part
//  readFileSync imposes program halting till file is read
            if(queryType == 'json')
            {
//  Build jsonPathName from id and try to readSync the file
                let jsonPathName    = `database/data${id}.json`;
                fs.readFile(jsonPathName, (err, data) => {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.write(data);
                    console.log(jsonPathName);
                    utilities.errorHandler(err, response);
                    response.end();
                });
            }
//  Build qrPathName from id and try to readSync the file
            else if(queryType == 'qr')
            {
                let qrPathName      = `qrCodes/data${id}.png`;
                fs.readFile(qrPathName, (err, data) => {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'image/png');
                    response.write(data);
                    console.log(qrPathName);
                    utilities.errorHandler(err, response);
                    response.end();
                });
            }
        }
    }
//  If method is POST, try to catch body and save it in server storage
//  Then send a 201 - Created response
//  The origin server MUST create the resource before returning the 201 status code
//  If the action cannot be carried out immediately, the server SHOULD respond with 202 (Accepted) response instead
    else if(method == 'POST')
    {
        let body        = [];
        let dbFiles     = undefined;
        let qrFilePath  = undefined;

        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

//  Get list of all elements inside the folder to avoid rewriting existing .json
            fs.readdir(dbFolder, (err, dbFiles) => {
                fs.writeFile(`database/data${dbFiles.length}.json`, body, 'utf8', (err) => {
                    console.log('data' + dbFiles.length + ' has been saved!');
                });
                qrFilePath = `qrCodes/data${dbFiles.length}.png`;
//  Generate qr code and save it as .png file in ./qrCodes/, then call callback() to respond with 303 - redirect
//  Send a 303 response (see other) with the location of the .png qr code
                QRCode.toFile(qrFilePath, `127.0.0.1:3000/html/missioni.html/?id=${dbFiles.length}`, function (err) {
                    response.writeHead(303, {
                        'Location' : `?id=${dbFiles.length}&type=qr`
                    }).end();
                    console.log(qrFilePath + ' saved!');
                });
            });
        });
    }
});

//  function called on server listening gives some basic server info
server.listen(port, hostname, () =>
{
    console.log(`Server running at http://${hostname}:${port}/`);
});
