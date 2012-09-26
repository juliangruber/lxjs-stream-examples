var through = require('through');
var ts = through(write, end);

process.stdin.pipe(ts).pipe(process.stdout);
