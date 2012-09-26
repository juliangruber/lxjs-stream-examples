var fs = require('fs');
var ws = fs.createWriteStream('output.txt');

process.stdin.pipe(ws);
