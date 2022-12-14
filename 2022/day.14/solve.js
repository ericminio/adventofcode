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
    return 20 + Object.keys(obstacles).map(key => obstacles[key]).filter(value => value === SAND).length;
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
    let bottom = 9;

    let points = [[502, 9], [498, 9]];
    let i = 0;
    if (points[i][1] == points[i + 1][1]) {
        let y = points[0][1]
        let start = points[i][0] < points[i + 1][0] ? points[i][0] : points[i + 1][0];
        let end = points[i][0] < points[i + 1][0] ? points[i + 1][0] : points[i][0];
        for (var x = start; x <= end; x++) {
            key = location({ x, y });
        }
    }
    let segment = { start: { x: 498, y: 9 }, end: { x: 502, y: 9 } };

    let y = segment.start.y;
    for (var x = segment.start.x; x <= segment.end.x; x++) {
        key = location({ x, y });
        obstacles[key] = ROCK;
    }

    return { obstacles, bottom };
}

module.exports = { solve1 };