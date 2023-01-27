const HORIZONTAL = class Horizontal {
    points() {
        return [
            { x: this.position.x, y: this.position.y },
            { x: this.position.x + 1, y: this.position.y },
            { x: this.position.x + 2, y: this.position.y },
            { x: this.position.x + 3, y: this.position.y }
        ];
    }
};
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
        return new this.collection[this.current];
    }
}

module.exports = { Shapes, HORIZONTAL, PLUS, EL, VERTICAL, SQUARE };