var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = function () {
    return new Box;
};

function Box () {
    var div = this.element = document.createElement('div');
    var pressed = false;
    
    div.addEventListener('mousedown', function (ev) {
        pressed = true;
    });
    
    div.addEventListener('mousemove', function (ev) {
        
    });
    
    div.addEventListener('mouseup', function (ev) {
        pressed = false;
    });
}

inherits(Box, EventEmitter);

Box.prototype.move = function (pos) {
    this.x = this.element.style.left = pos.x;
    this.y = this.element.style.top = pos.y;
};
