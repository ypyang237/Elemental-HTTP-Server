'use strict'

module.exports.elementBuilder = ( template, name, symbol, number, desc) => {
 return template.toString()
  .replace(/{{ elementName }}/gi, name)
  .replace(/{{ elementSymbol }}/gi, symbol)
  .replace(/{{ elementAtomicNumber }}/gi, number)
  .replace(/{{ elementDescription }}/gi, desc);



};