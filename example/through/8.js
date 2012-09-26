var through = require('through');
var ts = through(function (buf) {
    this.emit('data', buf.toString().toUpperCase());
});

process.stdin.pipe(ts).pipe(process.stdout);
