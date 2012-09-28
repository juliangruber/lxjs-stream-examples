var fs = require('fs');
var src = fs.readFileSync('timing.txt', 'utf8');
var time = src.split('\n').reduce(function (sum, line) {
    var x = line.match(/(\d+)m(\d+)s/);
    if (!x) return sum;
    return sum + Number(x[1]) * 60 + Number(x[2]);
}, 0) / 60;
console.log(time);
