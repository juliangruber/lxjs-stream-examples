var MuxDemux = require('mux-demux');
var md = new MuxDemux;

md.on('connection', function (c) {
    console.dir(c.meta);
});

var shoe = require('shoe');
md.pipe(shoe('/sock')).pipe(md);
