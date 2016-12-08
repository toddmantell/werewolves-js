(function() {    
    'use strict';

var staticModule = require('node-static');

var file = new staticModule.Server(__dirname);

var http = require('http');

var server = http.createServer(createHTTP);

var port = process.env.PORT || 3000;

server.listen(port);

console.log("Listening on port " + port);

function createHTTP(request, response) {
    if (request.method === 'GET') {
        request.addListener('end', () => {
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} Request from: ${request.connection.remoteAddress}`);//socket._peername.address
            file.serve(request, response, (e, res) => {
            if (e && (e.status === 404)) { // If the file wasn't found 
                //fileServer.serveFile('/not-found.html', 404, {}, request, response);
                response.writeHead(404);
                response.end("Oh no! The page you requested could not be found.");
                 }
            });
        }).resume();
    }
    else {
        response.writeHead(404);
        response.end("Page Not Found");
    }
};
}());