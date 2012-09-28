var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = function () {
    return new Box;
};

function Box () {
    var div = this.element = document.createElement('div');
    
    div.addEventListener('mouseup', function (ev) {
    });
    
    div.addEventListener('mousemove', function (ev) {
    });
    
    div.addEventListener('mousedown', function (ev) {
    });
}

inherits(Box, EventEmitter);

Box.prototype.move = function (pos) {
    this.x = this.element.style.left = pos.x;
    this.y = this.element.style.top = pos.y;
};
