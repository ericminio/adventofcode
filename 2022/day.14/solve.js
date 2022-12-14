const { lines } = require('../support');

const spawn = () => ({ x: 500, y: 0 });
const ROCK = 1;
const SAND = 2;

const solve1 = (file) => {
    let { obstacles, bottom } = parse(file);

    let unit;
    let overflow = false;
    while (!overflow) {
        unit = spawn();
        while (!isBlocked(unit, obstacles) && unit.y < bottom) {
            move(unit, obstacles);
        }
        if (isBlocked(unit, obstacles)) {
            obstacles[location(unit)] = SAND;
        }
        else {
            overflow = true;
        }
    }
    return Object.keys(obstacles)
        .map(key => obstacles[key])
        .filter(value => value === SAND).length;
};

const solve2 = (file) => {
    let { obstacles, bottom } = parse(file);
    bottom = bottom + 2;

    let unit;
    let didNotEvenMove = false;
    while (!didNotEvenMove) {
        unit = spawn();
        didNotEvenMove = true;
        while (!isBlocked2(unit, obstacles, bottom)) {
            move(unit, obstacles);
            didNotEvenMove = false;
        }
        obstacles[location(unit)] = SAND;
    }

    return Object.keys(obstacles)
        .map(key => obstacles[key])
        .filter(value => value === SAND).length;
};

const move = (unit, obstacles) => {
    if (obstacles[below(unit)] === undefined) {
        unit.y++;
        return;
    }
    if (obstacles[left(unit)] === undefined) {
        unit.y++;
        unit.x--;
        return;
    }
    if (obstacles[right(unit)] === undefined) {
        unit.y++;
        unit.x++;
        return;
    }
}
const isBlocked2 = (unit, obstacles, bottom) => {
    return (unit.y == (bottom - 1) || isBlocked(unit, obstacles));
};
const isBlocked = (unit, obstacles) => {
    return (obstacles[below(unit)] !== undefined
        && obstacles[left(unit)] !== undefined
        && obstacles[right(unit)] !== undefined);
};
const below = unit => `${unit.x}x${unit.y + 1}`;
const left = unit => `${unit.x - 1}x${unit.y + 1}`;
const right = unit => `${unit.x + 1}x${unit.y + 1}`;
const location = unit => `${unit.x}x${unit.y}`;

const parse = (file) => {
    let obstacles = {};
    let bottom = 0;

    let walls = lines(file).map(line => line.split('->')
        .map(p => p.split(','))
        .map(p => p.map(v => parseInt(v))));
    walls.forEach(points => {
        for (let i = 0; i < points.length - 1; i++) {
            if (points[i][1] == points[i + 1][1]) {
                let y = points[i][1];
                if (y > bottom) { bottom = y; }
                let start = points[i][0] < points[i + 1][0] ? points[i][0] : points[i + 1][0];
                let end = points[i][0] < points[i + 1][0] ? points[i + 1][0] : points[i][0];
                for (let x = start; x <= end; x++) {
                    key = location({ x, y });
                    obstacles[key] = ROCK;
                }
            }
            else {
                let x = points[i][0];
                let start = points[i][1] < points[i + 1][1] ? points[i][1] : points[i + 1][1];
                let end = points[i][1] < points[i + 1][1] ? points[i + 1][1] : points[i][1];
                for (let y = start; y <= end; y++) {
                    if (y > bottom) { bottom = y; }
                    key = location({ x, y });
                    obstacles[key] = ROCK;
                }
            }
        }
    });

    return { obstacles, bottom };
}

module.exports = { solve1, solve2 };