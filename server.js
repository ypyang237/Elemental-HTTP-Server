var http = require('http');
var fs = require('fs');


var server = http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;



  if(method === 'GET') {

    if(url === '/') {
      fs.readFile('public/index.html', function(error, chunk) {
        response.end(chunk);
      });
    } else {
      fs.readFile('public' + url, function(error, chunk) {

        if(error) {
          console.log('ERROR');

          return fs.readFile('public/404.html', function(error, chunk) {

            if(error) { console.log('cannot read 404 HTML'); }

            response.end(chunk);
          });
        }
        return response.end(chunk);
      });
    }
  }  //end of if method is get



  if(method === 'POST') {
    console.log(headers);
  }





  // request.on('error', function(err) {
  //   // This prints the error message and stack trace to `stderr`
  //   console.error(err);
  // });

  // request.on('data', function(data) {


  //   console.log('request has been sent');

  // });

  // request.on('end', function(){

  //   console.log('finished this request');
  // });

}); //end of http.createServer



server.listen({port: 8080}, function() {
  var address = server.address();
  console.log('opened server on %d', address.port);
});


