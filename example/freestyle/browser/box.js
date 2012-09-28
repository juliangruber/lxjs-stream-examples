var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = function () {
    return new Box;
};

function Box () {
    var self = this;
    var div = self.element = document.createElement('div');
    div.className = 'box';
    var pressed = false;
    
    div.addEventListener('mousedown', function (ev) {
        ev.stopPropagation();
        pressed = {
            x : ev.clientX - (self.x || 100),
            y : ev.clientY - (self.y || 100)
        };
    });
    
    var to;
    div.addEventListener('mousemove', function (ev) {
        ev.stopPropagation();
        if (!pressed) return;
        
        var pos = {
            x : ev.clientX  - pressed.x,
            y : ev.clientY - pressed.y
        };
        self.move(pos);
        if (!to) setTimeout(function () {
            self.emit('position', { x : self.x, y : self.y });
            to = null;
        }, 250);
    });
    
    div.addEventListener('mouseup', function (ev) {
        ev.stopPropagation();
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
