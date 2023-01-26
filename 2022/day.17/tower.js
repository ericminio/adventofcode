class Tower {
    constructor() {
        this.fallenRocks = 0;
        this.height = 0;
        this.settled = {};
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
        this.fallenRocks = this.fallenRocks + 1;
        const points = rock.points();
        points.forEach(point => {
            this.settled[this.id(point)] = point;
            if (point.y > this.height) {
                this.height = point.y;
            }
        });
        this.height = 1;
    }
    id(point) {
        return `${point.x}x${point.y}`;
    }
}

module.exports = { Tower };