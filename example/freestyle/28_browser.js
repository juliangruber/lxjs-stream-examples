var MuxDemux = require('mux-demux');
var md = new MuxDemux;

md.on('connection', function (c) {
    console.dir(c.meta);
});
