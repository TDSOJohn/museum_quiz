//  Route

//  RESTful API URL format: http://server_ip:port/?id=n (n is integer {1, 2, 3})
//  client-side HTML retrieval URL format: http://192.168.1.110/client_side/webpage.html
//  javascript is in strict mode => throws more errors and could give better performance
'use strict';

//  HTTP, FileSystem and URL modules are required
const http = require('http');
const fs = require('fs');
const { URL } = require('url');
const path = require('path');

//  npm dependencies
var QRCode = require('qrcode');

const utilities = require('/webapp/museum_quiz/server_side/utilities.js');
const dbFolder = '/webapp/museum_quiz/server_side/database/';

//  accept any connection to the correct port
const hostname = '0.0.0.0';
//  ruby-on-rails default, better change it
const port = 8000;

const this_ip = '130.136.1.50';

var mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.jpg': 'image/jpg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf'
};


//  create http server, retrieve id and have it send the correct json through http
const server = http.createServer((request, response) => {
    const { method, url } = request;
    const { headers } = request;

    //  myURL is (baseURL + request.url) in order to form a correct WHATWG URL
    let baseURL = 'http://' + request.headers.host;
    let myURL = new URL(request.url, baseURL);
    let pathName = myURL.pathname;
    let id = utilities.intParser(myURL.searchParams.get('id'));
    let queryType = myURL.searchParams.get('type');

    console.log(method);
    console.log(myURL);
    console.log(id);
    console.log(pathName);

    //  If method is GET, it is access to file or to RESTful API
    if (method == 'GET')
    {
        //  If no path to file nor id is given, run the first example (id = 1)
        if ((pathName == '/') && (id <= 0))
        {
            pathName = '/html/gioco.html';
            id = 1;
        }
        //  If pathname is path to a resource, try to fetch it and send it to the client
        if (pathName !== '/')
        {
            let extName = String(path.extname(pathName)).toLowerCase();

            //  Back to "home" folder ( /client_side )
            let completePathName = '/webapp/museum_quiz/client_side' + pathName;
            console.log(completePathName);

            fs.readFile(completePathName, (err, data) =>
            {
                if (err)
                    utilities.errorHandler(err, response);
                else
                {
                    //  If no ContentType matches, send as binary stream
                    let contentType = mimeTypes[extName] || 'application/octet-stream';
                    console.log(contentType);
                    response.statusCode = 200;
                    response.setHeader('Content-Type', contentType);
                    response.write(data);
                    response.end();
                }
            });
        } else if (id >= 0)
        {
            console.log('JSON REQUESTED: ' + id);
            //  RESTful API part. URL type:     http://ip:3000?id=n(&type=t)
            if (queryType == 'json' || queryType == null)
            {
                //  Build jsonPathName from id and try to readSync the file
                let jsonPathName = `/webapp/museum_quiz/server_side/database/data${id}.json`;
                fs.readFile(jsonPathName, (err, data) =>
                {
                    if (err)
                    {
                        utilities.errorHandler(err, response);
                        response.end();
                    } else
                    {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        response.write(data);
                        console.log(jsonPathName);
                        response.end();
                    }
                });
            }
            //  Build qrPathName from id and try to readSync the file
            else if (queryType == 'qr')
            {
                let qrPathName = `/webapp/museum_quiz/server_side/qrCodes/data${id}.png`;
                fs.readFile(qrPathName, (err, data) =>
                {
                    if (err)
                        utilities.errorHandler(err, response);
                    else
                    {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'image/png');
                        response.write(data);
                        console.log(qrPathName);
                    }
                    response.end();
                });
            }
        }
    }
    //  If method is POST, try to catch body and save it in server storage
    //  Then send a 303 - See Other with a location header to newly created qr code
    else if (method == 'POST')
    {
        let body = [];
        let dbFiles = undefined;
        let qrFilePath = undefined;

        request.on('data', (chunk) =>
        {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            //  Get list of all elements inside the folder to avoid rewriting existing .json
            fs.readdir(dbFolder, (err, dbFiles) =>
            {
                if (err)
                    utilities.errorHandler(err);
                else
                {
                    fs.writeFile(`/webapp/museum_quiz/server_side/database/data${dbFiles.length + 1}.json`, body, 'utf8', (err) =>
                    {
                        console.log('data' + (dbFiles.length + 1) + ' has been saved!');
                    });
                    qrFilePath = `/webapp/museum_quiz/server_side/qrCodes/data${dbFiles.length + 1}.png`;
                    //  Generate qr code and save it as .png file in ./qrCodes/, then call callback() to respond with 303 - redirect
                    //  Send a 303 response (see other) with the location of the .png qr code
                    QRCode.toFile(qrFilePath, `http://${this_ip}:${port}/webapp/museum_quiz/server_side/html/gioco.html?id=${dbFiles.length + 1}`, function (err) {
                        response.writeHead(303, {
                            'Location': `?id=${dbFiles.length + 1}&type=qr`
                        });
                        console.log(qrFilePath + ' saved!');
                    });
                }
            });
        });
    }
});

//  function called on server listening gives some basic server info
server.listen(port, hostname, () =>
{
    console.log(`Server running at http://${hostname}:${port}/`);
});
