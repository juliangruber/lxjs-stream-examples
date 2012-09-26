var EventEmitter = require('events').EventEmitter;
var em = new EventEmitter;

var JSONStream = require('JSONStream');
var emitStream = require('emit-stream');

var net = require('net');
var server = net.createServer(function (stream) {
    var es = emitStream(em).pipe(JSONStream.stringify());
    es.pipe(stream);
});
server.listen(8000);

setInterval(function () {
    em.emit('beep', 'boop');
}, 100);
