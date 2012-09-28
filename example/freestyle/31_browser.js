var MuxDemux = require('mux-demux');
var md = new MuxDemux;

var Model = require('scuttlebutt/model');
var model = new Model;

md.on('connection', function (c) {
    if (c.meta === 'state') {
        c.pipe(model.createStream()).pipe(c);
    }
    else if (c.meta === 'events') {
        
    }
});

var shoe = require('shoe');
md.pipe(shoe('/sock')).pipe(md);
