var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!
var urls;


var actions = {
  "GET": function(req,res) {
    // httpHelpers.getURL();
    var url = req.url;
    if (url === '/') {
      url += 'index.html';
    }

    // invoke isURLInList
    // callback that will return a boolean value
    archive.downloadUrls('www.amazon.com');
    console.log(archive.isURLArchived('www.amazon.com'));


    res.writeHead(200, httpHelpers.headers)
    httpHelpers.serveAssets(res, url, function() {});
  },
  "POST": function(req,res) {
    res.writeHead(200, httpHelpers.headers)
  },
  "OPTIONS": function(req,res) {
    res.writeHead(200, httpHelpers.headers)
  }
};

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    res.writeHead(404, httpHelpers.headers)
  }

  // res.end(archive.paths.list);
};
