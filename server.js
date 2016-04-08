var http = require('http');
var fs = require('fs');

var getRequest = require('./lib/get.js');
var postRequest = require('./lib/post.js');
var putRequest = require('./lib/put.js');
var deleteRequest = require('./lib/delete.js');


var server = http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;

  var errorBody = null;

 if(request.rawHeaders.indexOf('Authorization') === -1 && method !== "GET" ) {
    console.log('theres no authorization');

    response.statusCode =401;
    response.setHeader('WWW-Authenticate', 'BasicRealm = "SecureArea"');
    response.end("<html><body>Not Authorized</body></html>");

  } else if (method === "GET") {
    getRequest(url, response);
  }

  else {

    var index = request.rawHeaders.indexOf('Authorization');
    var encodedString = request.rawHeaders[index+1].substr(6);
    var base64Buffer = new Buffer(encodedString, 'base64');
    var decodedString = base64Buffer.toString();


    if(decodedString.includes('Aladdin:opensesame')=== false){

        response.writeHead(401, {
          'WWW-Authenticate' : "BasicRealm = SecureArea"
         });
        return response.end(`<html><body>Not Authorized</body></html>`);
    }


    if(method === 'POST' && url === '/elements') {
      postRequest(url, request, response);
    }

    if(method === 'PUT') {
      putRequest(url, request, response);
    }

    if(method === 'DELETE') {
      deleteRequest(url, response);
    }

  } //end of else statement


}); //end of http.createServer

server.listen({port: 8080}, function() {
  var address = server.address();
  console.log('opened server on %d', address.port);
});


