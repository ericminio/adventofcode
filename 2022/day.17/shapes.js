const HORIZONTAL = class Horizontal {};
const PLUS = class Plus {};
const EL = class El{};
const VERTICAL = class Vertical {};
const SQUARE = class Square {};

class Shapes {
    constructor() {
        this.current = -1;
        this.collection = [ HORIZONTAL, PLUS, EL, VERTICAL, SQUARE ];
    }

    next() {
        this.current = (this.current + 1) % this.collection.length;
        return new this.collection[this.current]();
    }
}

module.exports = { Shapes, HORIZONTAL, PLUS, EL, VERTICAL, SQUARE };