const HORIZONTAL = {};

class Shapes {
    constructor() {
        this.current = -1;
        this.collection = [ HORIZONTAL ];
    }

    next() {
        this.current = (this.current + 1) % this.collection.length;
        return this.collection[this.current];
    }
}

module.exports = { Shapes, HORIZONTAL };