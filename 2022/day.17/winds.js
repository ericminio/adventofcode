const LEFT = { dx: -1 };
const RIGHT = { dx: 1 };

class Winds {
    constructor(specs) {
        this.directions = specs.split('').map(spec => {
            if (spec === '<') {
                return LEFT;
            }
            if (spec === '>') {
                return RIGHT;
            }
        });
        this.current = -1;
    }

    next() {
        this.current = (this.current + 1) % this.directions.length;
        return this.directions[this.current];
    }
}

module.exports = { Winds, LEFT, RIGHT };