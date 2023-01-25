const LEFT = { dx: -1 };

class Winds {
    constructor(specs) {
        this.directions = specs.split('').map(spec => {
            if (spec === '<') {
                return LEFT;
            }
        });
        this.current = 0;
    }

    next() {
        return LEFT;
    }
}

module.exports = { Winds, LEFT };