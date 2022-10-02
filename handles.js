const url = require('url')
const qs = require('querystring')
const { readFileSync } = require('fs');


// ./handles.js
// Necessary imports
module.exports = {
  serverHandle: function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname
    const params = qs.parse(route.query)
    const user = JSON.parse(readFileSync("./about.json", 'utf-8'));
    var i = 0;

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (path === '/hello' && 'name' in params) {

      res.write('Hello ' + params['name'])

        for (i = 0; i < user.length; i++) {

          if (params['name'] === user[i].author) {
            res.write("\n\n\n")
            res.write(user[i].title)
            res.write("\n\n")
            res.write(user[i].content)
            res.write("\n")
            res.write(user[i].date)
            res.write("\n")
          }
        }
      


    }
    else if (path === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write("En rentrant dans l'url <a href='/hello?name='>hello?name=votre_nom</a>, vous pourrez voir votre nom affiche,<br> si votre nom est dans notre BDD, alors vos informations s'afficheront")

    }

    else if (path === '/about'){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      for (i = 0; i < user.length; i++) {
      res.write("\n")
      res.write(user[i].title)
      res.write("\n")
      res.write(user[i].content)
      res.write("\n")
      res.write(user[i].author)
      res.write("\n")
      res.write(user[i].date)
      res.write("\n\n\n")
      }
    }

    else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write("ERROR 404 : Page not found !")
    }

    res.end();
  }
}

