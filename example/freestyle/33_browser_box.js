var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = function () {
    return new Box;
};

function Box () {
    this.element = document.createElement('div');
}

inherits(Box, EventEmitter);

Box.prototype.move = function (pos) {
    this.x = this.element.style.left = pos.x;
    this.y = this.element.style.top = pos.y;
};
