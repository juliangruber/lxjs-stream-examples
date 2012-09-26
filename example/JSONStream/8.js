var JSONStream = require('JSONStream');
var fs = require('fs');

var parser = JSONStream.parse([ 'features', true, 'geometry', 'coordinates' ]);

var stringify = JSONStream.stringify();
parser.pipe(stringify);

fs.createReadStream('citylots.json').pipe(parser);
