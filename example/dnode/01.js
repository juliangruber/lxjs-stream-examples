var net = require('net');
var dnode = require('dnode');

var server = net.createServer(function (stream) {
    var d = dnode({
        louder : function (s, cb) {
            
        }
    });
});
server.listen(8000);
