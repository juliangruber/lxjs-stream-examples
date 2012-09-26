var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var ws = fs.createWriteStream(__dirname + '/output.txt');
    req.pipe(ws);
    
    req.on('end', function () {
        res.end('ok\n');
    });
});
server.listen(8000);
