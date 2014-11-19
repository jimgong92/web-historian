var http = require("http");
var httpRequest = require("http-request");
var handler = require("./request-handler");


var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
var url = 'www.amazon.com';
httpRequest.get({
  url: url,
  progress: function (current, total) {
    console.log('downloaded %d bytes from %d', current, total);
  },
}, url, function (err,res){
  if (err) {
    console.log(err);
    return;
  }

  console.log('end');
})

server.listen(port, ip);

