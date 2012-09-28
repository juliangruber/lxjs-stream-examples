var Model = require('scuttlebutt/model');
var model = new Model;

var emitStream = require('emit-stream');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter;

function createStream () {
    var MuxDemux = require('mux-demux');
    var mdm = new MuxDemux;
    
    var ms = model.createStream();
    var es = emitStream(emitter);
    
    mdm.on('connection', function (c) {
        c.pipe({ state : ms, events : es }[c.meta]).pipe(c);
    });
    
    process.nextTick(function () {
        ms.pipe(mdm.createStream('state')).pipe(ms);
        es.pipe(mdm.createStream('events')).pipe(es);
        model.set('connections', (model.get('connections') || 0) + 1);
    });
    
    mdm.on('close', function () {
        model.set('connections', model.get('connections') - 1);
    });
    
    return mdm;
}

var http = require('http');
var ecstatic = require('ecstatic')(__dirname + '/static');
var server = http.createServer(function (req, res) {
    if (req.url === '/stream') {
        req.pipe(createStream()).pipe(res);
        emitter.emit('join', req.socket.address());
        
        req.on('end', function () {
            emitter.emit('part', req.socket.address());
        });
    }
    else ecstatic(req, res)
});
server.listen(Number(process.argv[2]));

var shoe = require('shoe');
var sock = shoe(function (stream) {
    stream.pipe(createStream()).pipe(stream);
    
    emitter.emit('join', stream.address);
    stream.on('end', function () {
        emitter.emit('part', stream.address);
    });
});
sock.install(server, '/sock');

var request = require('request');
process.argv.slice(3).map(Number).forEach(function (port) {
    var r = request.put('http://localhost:' + port + '/stream');
    r.pipe(createStream()).pipe(r);
});
