var fs = require('fs');
var Stream = require('stream');

var ws = new Stream;

process.stdin.pipe(ws);
