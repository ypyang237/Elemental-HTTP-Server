var fs = require('fs');

function getRequest(url, response) {

      if(url === '/') {
        fs.readFile('public/index.html', function(error, chunk) {
          response.end(chunk);
        });
      } else {
        fs.readFile('public' + url, function(error, chunk) {

          if(error) {
            return fs.readFile('public/404.html', function(error, chunk) {

              if(error) { console.log('cannot read 404 HTML'); }

              response.end(chunk);
            });
          }
          return response.end(chunk);
        });
      }
    }  //end of if method is get

module.exports = getRequest;