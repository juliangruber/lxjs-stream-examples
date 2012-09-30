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
    if (c.meta === 'dnode') {
        var d = dnode();
        d.on('remote', function (remote) {
            
        });
        d.pipe(c).pipe(d);
    }
    else if (c.meta === 'state') {
        c.pipe(model.createStream()).pipe(c);
    }
    else if (c.meta === 'events') {
        var em = emitStream(c);
        em.on('join', function (addr) {
            document.querySelector('#log').textContent
                += 'join ' + JSON.stringify(addr) + '\n';
        });
        em.on('part', function (addr) {
            document.querySelector('#log').textContent
                += 'part ' + JSON.stringify(addr) + '\n';
        });
    }
});

var shoe = require('shoe');
md.pipe(shoe('/sock')).pipe(md);
