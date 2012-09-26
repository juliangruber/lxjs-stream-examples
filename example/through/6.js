var through = require('through');
var ts = through(write, end);

function write (buf) {
    this.emit('data', buf.toString().toUpperCase());
}

function end () {
    this.emit('end');
}

process.stdin.pipe(ts).pipe(process.stdout);
