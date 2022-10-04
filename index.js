const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World!</p>' +
'    </body>' +
'</html>'



// ./index.js
const http = require('http')
const handles = require('./handles')
const server = http.createServer(handles.serverHandle);
server.listen(8080)



