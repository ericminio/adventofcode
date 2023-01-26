const HORIZONTAL = class Horizontal {
    left() {
        return [ { x: this.position.x + 4, y: this.position.y } ];
    }
    right() {
        return [ { x: this.position.x - 1, y: this.position.y } ];
    }
    below() {
        return [
            { x: this.position.x, y: this.position.y - 1 },
            { x: this.position.x + 1, y: this.position.y - 1 },
            { x: this.position.x + 2, y: this.position.y - 1 },
            { x: this.position.x + 3, y: this.position.y - 1 }
        ];
    }
    canMove(wind, tower) {
        const points = wind.dx > 0 ? this.right() : this.left();
        let point = { y: this.position.y };
        point.x = wind.dx > 0 ? this.position.x + 4 : this.position.x - 1;

        return tower.isFree(point);
    }
    canFall(tower) {
        return tower.areFree(this.below());
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