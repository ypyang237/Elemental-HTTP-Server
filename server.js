var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var gutil = require('gulp-util');


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



  if(method === 'POST' && url === '/elements') {

    request.on('data', function(chunk) {

    result = chunk.toString();
    var parsed = qs.parse(result);

    var elementName = parsed.elementName;
    var elementSymbol = parsed.elementSymbol;
    var elementAtomicNumber = parsed.elementAtomicNumber;
    var elementDescription = parsed.elementDescription;

    var myFile = fs.createWriteStream('public/' + elementName + '.html', { encoding: "utf8" }    );

    myFile.write(
      '<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n<meta charset="UTF-8">\r\n<title>\r\n'+
      'The Elements - Helium</title>\r\n<link rel="stylesheet" href="/css/styles.css">\r\n'+
      '</head>\r\n<body>\r\n'+
      '<h1>' + elementName + '</h1>\r\n' +
      '<h2>' + elementSymbol + '</h2>\r\n' +
      '<h3>Atomic Number '+ elementAtomicNumber + '</h3>\r\n' +
      '<p>' + elementDescription + '</p>\r\n' +
      '<a href="/">back</a>\r\n</p></body></html>'
      );

    var index = fs.readFile('public/index.html', function(error, chunk) {
       var chunky = chunk;
       var addLink = (chunky.toString().substr(0, 258) +
        '\r\n' + '<li>'+ '\r\n' + '<a href="/' + elementName + '.html">' + elementName + '</a>'+ '\r\n' + '</li>' +
        chunky.toString().substr(258) );

      var myFile = fs.createWriteStream('public/index.html');
      myFile.write(addLink);

      });

    var responseBody = ({'success' : true});
    response.write(JSON.stringify(responseBody));
    response.statusCode = 200;

    response.end();

    });

  }  //end of POST

  if(method === 'PUT') {

    request.on('data', function(chunk) {

    result = chunk.toString();
    var parsed = qs.parse(result);

    var elementName = parsed.elementName;
    var elementSymbol = parsed.elementSymbol;
    var elementAtomicNumber = parsed.elementAtomicNumber;
    var elementDescription = parsed.elementDescription;

      fs.readFile('public/' + url, function(error, chunk) {
      if(error) {
        var failBody = { "error" : "resource /carbon.html does not exist" };
        response.statusCode = 500;
        return response.write(JSON.stringify(failBody));

      } else {
          var myFile = fs.createWriteStream('public' + url);

          var successBody = { "success" : true };
          response.write(JSON.stringify(successBody));
          response.statusCode = 200;

          myFile.write(
          '<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n<meta charset="UTF-8">\r\n<title>\r\n'+
          'The Elements - Helium</title>\r\n<link rel="stylesheet" href="/css/styles.css">\r\n'+
          '</head>\r\n<body>\r\n'+
          '<h1>' + elementName + '</h1>\r\n' +
          '<h2>' + elementSymbol + '</h2>\r\n' +
          '<h3>'+ elementAtomicNumber + '</h3>\r\n' +
          '<p>' + elementDescription + '</p>\r\n'+
          '<a href="/">back</a>\r\n\r\n</p></body></html>'
          );


        }
        response.end();

      });

    });

  } //end of PUT request


  if(method === 'DELETE') {

    fs.readFile('public/' + url, function(error, chunk) {
      if(error) {
        var failBody =  { "error" : "resource " + url + "does not exist" };
        console.log(gutil.colors.red('File not found, so not deleting.'));
        response.statusCode = 500;
        return response.write(JSON.stringify(failBody));
      }
      else {
        response.statusCode = 200;
        var successBody = { "success" : true };
        console.log(gutil.colors.green('File exists. Deleting now ...'));
        fs.unlink('./public' + url);
        return response.write(JSON.stringify(successBody));
      }

    });



  }//end of DELETE request






}); //end of http.createServer



server.listen({port: 8080}, function() {
  var address = server.address();
  console.log('opened server on %d', address.port);
});


