var http = require("http");
var urlParser = require ("url");
// var httpRequest = require("http-request");
var handler = require("./request-handler");
// var fs = require('fs');
// var httpHelpers = require("http-helpers");

//ROUTES
// var routes = { '/': require('./request-handler')};

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(handler.handleRequest);
// var server = http.createServer(function (req, res) {
//   var urlParts = urlParser.parse(req.url);
//   console.log('req.url');
//   var route = routes[urlParts.pathname];
//   if (route) {
//     route(req,res);
//   } else {
//     httpHelpers.sendResponse(res, 'Not Found',404);
//   }
// });

console.log("Listening on http://" + ip + ":" + port);




server.listen(port, ip);


