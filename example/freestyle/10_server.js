var Model = require('scuttlebutt/model');
var model = new Model;

function createStream () {
    return model.createStream();
}

var http = require('http');
var server = http.createServer(function (req, res) {
    // ...
});
server.listen(Number(process.argv[2]));
