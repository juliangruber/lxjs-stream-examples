var MuxDemux = require('mux-demux');
var md = new MuxDemux;

var Model = require('scuttlebutt/model');
var model = new Model;

var createBox = require('./browser/box');
var box = createBox();
box.appendTo(document.body);

var emitStream = require('emit-stream');
var dnode = require('dnode');

model.on('update', function (key, value) {
    if (key === 'position') box.move(value);
});

box.on('position', function (pos) {
    model.set('position', pos);
});

md.on('connection', function (c) {
  console.log('connection!')
    if (c.meta === 'dnode') {
        var d = dnode();
        d.on('remote', function (remote) {
            remote.loud('hola lisboa\n', function (s) {
                document.querySelector('#log').textContent += s;
            });
        });
        c.pipe(d).pipe(c);
    }
    else if (c.meta === 'state') {
        c.pipe(model.createStream()).pipe(c);
        c.on('data', console.log.bind(console))
    }
    else if (c.meta === 'events') {
        var em = emitStream(c);
        em.on('join', function (addr) {
            document.querySelector('#log').textContent
                += 'join ' + JSON.stringify(addr) + '\n';
        });
        em.on('part', function (addr) {
            document.querySelector('#log').textContent
                += 'join ' + JSON.stringify(addr) + '\n';
        });
    }
});

var shoe = require('shoe');
md.pipe(shoe('/sock')).pipe(md);
