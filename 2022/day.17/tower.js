class Tower {
    constructor() {
        this.fallenRocks = 0;
        this.height = 0;
    }

    isFree(point) {
        return point.x <= 7;
    }
}

module.exports = { Tower };