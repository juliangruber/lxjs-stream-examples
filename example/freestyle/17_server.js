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
var server = http.createServer(function (req, res) {
    if (req.url === '/stream') {
        req.pipe(createStream()).pipe(res);
        emitter.emit('join', req.socket.address());
        
        req.on('end', function () {
            emitter.emit('part', req.socket.address());
        });
    }
});
server.listen(Number(process.argv[2]));
