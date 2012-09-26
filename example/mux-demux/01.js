var MuxDemux = require('mux-demux');
var md = new MuxDemux;

var a = md.createWriteStream();
var b = md.createWriteStream();
