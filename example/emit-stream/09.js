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

server.on('listening', function () {
    var stream = net.connect(8000);
    var e = emitStream(stream.pipe(JSONStream.parse([true])));
});

setInterval(function () {
    em.emit('beep', 'boop');
}, 100);
