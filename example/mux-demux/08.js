var MuxDemux = require('mux-demux');
var net = require('net');

var server = net.createServer(function (stream) {
    var md = new MuxDemux;
    md.pipe(stream).pipe(md);
    
    var a = md.createWriteStream('a');
    var b = md.createWriteStream('b');
    
    var fs = require('fs');
    fs.createReadStream('/usr/share/dict/words', { encoding : 'utf8' }).pipe(a);
    fs.createReadStream('/etc/passwd', { encoding : 'utf8' }).pipe(b);
});

server.on('listening', function () {
    var stream = net.connect(8000);
    var md = new MuxDemux;
    
    md.on('connection', function (s) {
        var size = 0;
        s.on('data', function (buf) {
            size += buf.length;
        });
        
        s.on('end', function () {
            console.log(s.meta + ': ' + size + ' bytes');
        });
    });
    md.pipe(stream).pipe(md);
});

server.listen(8000);
