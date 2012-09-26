var through = require('through');
var ts = through(write);

function write (buf) {
    this.emit('data', buf.toString().toUpperCase());
}

process.stdin.pipe(ts).pipe(process.stdout);
