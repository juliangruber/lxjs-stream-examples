var MuxDemux = require('mux-demux');
var md = new MuxDemux;
md.pipe(process.stdout);

var a = md.createWriteStream();
var b = md.createWriteStream();
