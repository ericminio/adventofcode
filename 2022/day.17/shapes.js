const HORIZONTAL = class Horizontal {
    canMove(wind, tower) {
        let point = { y: this.position.y };
        point.x = wind.dx > 0 ? this.position.x + 4 : this.position.x - 1;

        return tower.isFree(point);
    }
    canFall(tower) {
        let point = { x: this.position.x, y: this.position.y - 1 };

        return tower.isFree(point);
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