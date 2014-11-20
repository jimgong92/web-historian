var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpRequest = require('http-request');

exports.headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

// exports.sendResponse = function (response, data, statusCode) {
//   statusCode = statusCode || 200;
//   response.writeHead(statusCode, headers);
//   response.end(data);
// };

exports.serveAssets = function(res, asset, callback) {

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var assetPath;
  if (asset === '/index.html') {
    assetPath = archive.paths.siteAssets + asset;
  }
  else {
    assetPath = archive.paths.archivedSites + asset;
  }
  fs.readFile(assetPath, function(err, data){
    res.end(data);
  })

};

// As you progress, keep thinking about what helper functions you can put here!
