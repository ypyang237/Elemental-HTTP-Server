var fs = require('fs');

function elementBuilder( template, name, symbol, number, desc) {
 return template.toString()
  .replace(/{{ elementName }}/gi, name)
  .replace(/{{ elementSymbol }}/gi, symbol)
  .replace(/{{ elementAtomicNumber }}/gi, number)
  .replace(/{{ elementDescription }}/gi, desc);
}

function templateCreator(options) {

  fs.readFile('templates/elementTemplate.html', function(err, template) {
    console.log(template.toString());
    if(err) {
      throw new Error(err);
    }
    var renderedTemplate = elementBuilder( template, options.elementName,'B', 5, 'earthy');
    console.log(renderedTemplate);

    fs.writeFile('public/' +  + '.html', renderedTemplate, (err) => {
      if(err) {
        throw (err);
      }
      response.writeHead(200, {
       'Content-Type' : 'application/json'
      });
      response.end(JSON.stringify({ 'success' : true}));
     });

  }); //end of fs.readFile on elementTemplate
}




module.exports = templateCreator;