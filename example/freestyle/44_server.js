var Model = require('scuttlebutt/model');
var model = new Model;

var emitStream = require('emit-stream');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter;

var dnode = require('dnode');

function createDnode () {
  return dnode({
            loud : function (s, cb) { cb(s.toUpperCase()) }
        });
}

function createStream (client) {
    var MuxDemux = require('mux-demux');
    var mdm = new MuxDemux;
    
//    var ms = model.createStream();
//    var es = emitStream(emitter);

    mdm.on('close', function () {
        model.set('connections', model.get('connections') - 1);
    });

    mdm.on('data', console.log)
    if(client) {

      mdm.on('connection', function (c) {
          console.log('CONNECTION!', c.meta)
          //create the stream WHEN the connection occurs, so there is no lost chunks
            c.pipe(
              'state' === c.meta  ? model.createStream()
            : 'events' === c.meta ? emitStream(emitter)
            : 'dnode' === c.meta  ? createDnode()
            : null //should never happen
            ).pipe(c)
      });
      return mdm
    }
    
    process.nextTick(function () {
        var d = createDnode()
        var ms = model.createStream();
        var es = emitStream(emitter);

        d.pipe(mdm.createStream('dnode')).pipe(d);
        
        ms.pipe(mdm.createStream('state')).pipe(ms);
        es.pipe(mdm.createStream('events')).pipe(es);
        model.set('connections', (model.get('connections') || 0) + 1);
        ms.resume()
    });
    
    return mdm;
}

var http = require('http');
var ecstatic = require('ecstatic')(__dirname + '/static');
var server = http.createServer(function (req, res) {
    console.log('connoct', req.url)
    if (req.url === '/stream') {
      console.log('REPLICATE')
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
    console.log('CONNECT')
    stream.pipe(createStream()).pipe(stream);
    
//    emitter.emit('join', stream.address);
    stream.on('end', function () {
        emitter.emit('part', stream.address);
    });
});
sock.install(server, '/sock');

var request = require('request');
process.argv.slice(3).map(Number).forEach(function (port) {
    console.log('CONNECT to', port)
    var r = request.put('http://localhost:' + port + '/stream');
    r.on('data', console.log)
    r.pipe(createStream(true).on('data', console.log)).pipe(r);
//    r._socket.setNoDelay()
    r.write('\n')
});
