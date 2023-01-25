const LEFT = { dx: -1 };

class Winds {
    constructor(spec) {

    }

    next() {
        return LEFT;
    }
}

module.exports = { Winds, LEFT };