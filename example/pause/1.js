var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var id = Math.random().toString(16).slice(2);
    var dir = __dirname + '/data/' + id;
    
    var ws = fs.createWriteStream(dir + '/output.txt');
    req.pipe(ws);
    
    req.on('end', function () {
        res.end(id + '\n');
    });
});
server.listen(8000);
