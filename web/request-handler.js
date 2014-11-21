var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var parseURL = require ('url');
// require more modules/folders here!
var urls;


var actions = {
  "GET": function(req,res) {
    var url = req.url;
    if (url === '/') {
      url += 'index.html';
    }
    // invoke isURLInList
    // callback that will return a boolean value

    res.writeHead(200, httpHelpers.headers)
    httpHelpers.serveAssets(res, url);
  },
  "POST": function(req,res) {
    res.writeHead(200, httpHelpers.headers)
    req.on('data', function (chunk) {
      // req is the website string
      var url = chunk.toString().slice(4);
      archive.downloadUrls(url);
      // if isURLArchived(req)
      if (archive.isURLArchived(url)){
        console.log('served up cache website.');
        // serve up cache website
        httpHelpers.serveAssets(res, url);
      // else check if isUrlInList(req)
      } else if (archive.isUrlInList(url)) {
        console.log('served up loading page.');
        // serve up loading page
        httpHelpers.serveAssets(res, '/loading.html');
      // else
      } else {
        //addUrlToList(req)
        archive.addUrlToList(url);
        //downloadUrls(req)
        archive.downloadUrls(url);
        console.log('add to cache!');
      }
    });


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
