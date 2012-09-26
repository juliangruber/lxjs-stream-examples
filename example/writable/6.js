var fs = require('fs');
var Stream = require('stream');

var ws = new Stream;
ws.writable = true;

ws.write = function (buf) {
    console.log('buf=' + buf);
};

ws.end = function (buf) {
    if (arguments.length) ws.write(buf);
    console.log('end!');
};

process.stdin.pipe(ws);
