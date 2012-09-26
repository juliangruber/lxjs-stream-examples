var fs = require('fs');
var Stream = require('stream');

var ws = new Stream;
ws.writable = true;
ws.bytes = 0;

ws.write = function (buf) {
    ws.bytes += buf.length;
};

ws.end = function (buf) {
    if (arguments.length) ws.write(buf);
    console.log('byte count: ' + ws.bytes);
};

process.stdin.pipe(ws);
