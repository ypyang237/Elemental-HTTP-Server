var fs = require('fs');
var qs = require('querystring');


function putRequest(url, request, response) {

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

module.exports = putRequest;