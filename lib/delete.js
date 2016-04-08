var fs = require('fs');
var gutil = require('gulp-util');

function deleteRequest(url, response) {

      fs.readFile('public/' + url, function(error, chunk) {
        if(error) {
          var failBody =  { "error" : "resource " + url + " does not exist" };
          console.log(gutil.colors.red('File not found, so not deleting.'));
          response.statusCode = 500;
          response.write(JSON.stringify(failBody));
          return response.end();
        }
        else {
          response.statusCode = 200;
          var successBody = { "success" : true };
          console.log(gutil.colors.green('File exists. Deleted'));
          fs.unlink('./public' + url);
          response.write(JSON.stringify(successBody));
          return response.end();

        }

      });

    }//end of DELETE request

module.exports = deleteRequest;