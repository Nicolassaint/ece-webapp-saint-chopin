const url = require('url')
const qs = require('querystring')
var monJson = require('./about.json');

// ./handles.js
// Necessary imports
module.exports = {
  serverHandle: function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname
    const params = qs.parse(route.query)

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (path === '/hello' && 'name' in params) {

      res.write('Hello ' + params['name'])
      if (params['name'] === monJson.author) {
        res.write("\n\n\n")
        res.write(monJson.title)
        res.write("\n\n")
        res.write(monJson.content)
        res.write("\n")
        res.write(monJson.date)
        res.write("\n")
        console.log(monJson)
      }
      else {
        res.write('\n\n ERROR 404, page not found !')
      }

    }
    else if (path === '/') {

      res.write("En rentrant dans l'url hello?name=votre_nom, vous pourrez voir votre nom affiche,\n si votre nom est dans notre BDD, alors vos informations s'afficheront")

    }

    else {
      res.write('ERROR 404, page not found !')
    }

    res.end();
  }
}

