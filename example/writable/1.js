var fs = require('fs');
var ws = fs.createWriteStream('output.txt');

ws.write('beep\n');
ws.write('boop\n');
ws.end();
