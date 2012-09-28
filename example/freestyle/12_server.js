var Model = require('scuttlebutt/model');
var model = new Model;

var emitStream = require('emit-stream');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter;

function createStream () {
    return model.createStream();
}

var http = require('http');
var server = http.createServer(function (req, res) {
    if (req.url === '/stream') {
        req.pipe(createStream()).pipe(res);
    }
});
server.listen(Number(process.argv[2]));
