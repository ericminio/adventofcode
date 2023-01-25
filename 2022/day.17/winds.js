const LEFT = { dx: -1 };

class Winds {
    constructor(specs) {
        this.directions = specs.split('').map(spec => {
            if (spec === '<') {
                return LEFT;
            }
        });
        this.current = -1;
    }

    next() {
        return this.directions[(this.current ++) % this.directions.length];
    }
}

module.exports = { Winds, LEFT };