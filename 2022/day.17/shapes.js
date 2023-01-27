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
const PLUS = class Plus {
    points() {
        return [
            { x: this.position.x, y: this.position.y },
        ];
    }
};
const EL = class El{
    points() {
        return [
            { x: this.position.x, y: this.position.y },
        ];
    }
};
const VERTICAL = class Vertical {
    points() {
        return [
            { x: this.position.x, y: this.position.y },
        ];
    }
};
const SQUARE = class Square {
    points() {
        return [
            { x: this.position.x, y: this.position.y },
        ];
    }
};

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