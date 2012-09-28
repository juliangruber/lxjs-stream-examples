var MuxDemux = require('mux-demux');
var md = new MuxDemux;

md.on('connection', function (c) {
    if (c.meta === 'state') {
        
    }
    else if (c.meta === 'events') {
        
    }
});

var shoe = require('shoe');
md.pipe(shoe('/sock')).pipe(md);
