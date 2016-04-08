var fs = require('fs');
var qs = require('querystring');

function postRequest(url, request, response) {

      request.on('data', function(chunk) {

        result = chunk.toString();
        var parsed = qs.parse(result);


        var elementName = parsed.elementName;
        var elementSymbol = parsed.elementSymbol;
        var elementAtomicNumber = parsed.elementAtomicNumber;
        var elementDescription = parsed.elementDescription;

////NEED TO CHECK IF FILE ALREADY EXISTS, IF IT DOES, THEN RETURN RESPONSEBODY WITH A MESSAGE, FS.STATUS

        fs.writeFile('public/' + elementName.toLowerCase() + '.html',  '<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n<meta charset="UTF-8">\r\n<title>\r\n'+
          'The Elements - ' + elementName + '</title>\r\n<link rel="stylesheet" href="/css/styles.css">\r\n'+
          '</head>\r\n<body>\r\n'+
          '<h1>' + elementName + '</h1>\r\n' +
          '<h2>' + elementSymbol + '</h2>\r\n' +
          '<h3>Atomic Number '+ elementAtomicNumber + '</h3>\r\n' +
          '<p>' + elementDescription + '</p>\r\n' +
          '<a href="/">back</a>\r\n</p></body></html>');

        var index = fs.readFile('public/index.html', function(error, chunk) {
           var chunky = chunk;
           var addLink = (chunky.toString().substr(0, 262) +
            '\r\n' + '<li>'+ '\r\n' + '<a href="/' + elementName + '.html">' + elementName + '</a>'+ '\r\n' + '</li>' +
            chunky.toString().substr(262) );

          var myFile = fs.createWriteStream('public/index.html');
          myFile.write(addLink);

          });

        var responseBody = ({'success' : true});
        response.write(JSON.stringify(responseBody));
        response.statusCode = 200;

        response.end();

      });

      request.on('end', function() {
        //VALIDATION CHECK, if it === 'undefined'
      });

    }  //end of POST


    module.exports = postRequest;