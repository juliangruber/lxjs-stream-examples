var fs = require('fs');
var Stream = require('stream');

var ws = new Stream;
ws.writable = true;

process.stdin.pipe(ws);
