class Tower {
    constructor() {
        this.fallenRocks = 0;
        this.height = 0;
        this.settled = {};
        this.heights = [];
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
        if (this.settled[this.id(point)] !== undefined) {
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
        const previousHeight = this.height;
        this.fallenRocks = this.fallenRocks + 1;
        const points = rock.points();
        points.forEach(point => {
            this.settled[this.id(point)] = point;
            if (point.y > this.height) {
                this.height = point.y;
            }
        });
        this.heights.push({
            fallenRocks: this.fallenRocks,
            height: this.height,
            delta: this.height - previousHeight
        });
    }
    id(point) {
        return `${point.x}x${point.y}`;
    }
}

module.exports = { Tower };