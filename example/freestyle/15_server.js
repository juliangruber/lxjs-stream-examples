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
    });
    
    return mdm;
}

var http = require('http');
var server = http.createServer(function (req, res) {
    if (req.url === '/stream') {
        req.pipe(createStream()).pipe(res);
    }
});
server.listen(Number(process.argv[2]));
