var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = function () {
    return new Box;
};

function Box () {
    var self = this;
    var div = self.element = document.createElement('div');
    var pressed = false;
    
    div.addEventListener('mousedown', function (ev) {
        pressed = {
            x : ev.clientX - (self.x || 100),
            y : ev.clientY - (self.y || 100)
        };
    });
    
    div.addEventListener('mousemove', function (ev) {
        if (!pressed) return;
        
        var pos = {
            x : ev.clientX  - pressed.x,
            y : ev.clientY - pressed.y
        };
        self.move(pos);
        self.emit('position', pos);
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

Box.prototype.appendTo = function (target) {
    target.appendChild(this.element);
};
