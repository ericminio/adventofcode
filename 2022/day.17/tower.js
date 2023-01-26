class Tower {
    constructor() {
        this.fallenRocks = 0;
        this.height = 0;
    }

    isFree(point) {
        if (point.x === 0) {
            return false;
        }
        if (point.x === 8) {
            return false;
        }
        if (point.y === 0) {
            return false;
        }

        return true;
    }

    areFree(points) {
        return points
            .map(point => this.isFree(point))
            .every(check => check === true);
    }

    settle(rock) {
        this.height = 1;
        this.fallenRocks = this.fallenRocks + 1;
    }
}

module.exports = { Tower };