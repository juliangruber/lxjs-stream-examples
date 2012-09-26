var Stream = require('stream');

var ts = new Stream;
ts.readable = true;
ts.writable = true;

ts.write = function (buf) {
    ts.emit('data', buf.toString().toUpperCase());
};
