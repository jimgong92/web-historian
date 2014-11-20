var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// reads from site.txt
exports.readListOfUrls = function(){
  var arr = fs.readFileSync(this.paths.list, "utf8").split('\n');
  arr.pop();
  return arr;
};

exports.isUrlInList = function (url) {
  var array = exports.readListOfUrls();
  for (var i = 0; i < array.length; i++) {
    var string = "" + array[i];
    if (url === string) return true;
  }
  return false;
}

// adds url to site.txt
exports.addUrlToList = function(url){
  if(!exports.isUrlInList(url)) {
    fs.appendFile(this.paths.list, url + '\n', function (err) {
      if (err) {
        console.log("ERROR: " + err);
      }
    });
  }
  else {
    //Send back loading.html to user
    console.log("Already in list.");
  }
};

// checks if file is in sites folder
exports.isURLArchived = function(){
};

// adds file to sites folder
exports.downloadUrls = function(url){
  // GET PAGE
  httpRequest.get({
    url: url,
    progress: function (current, total) {
      // console.log('downloaded %d bytes from %d', current, total);
    },
  }, '../archives/sites/' + url, function (err,res){
    if (err) {
      // console.log(err);
      return;
    }
  })
};
