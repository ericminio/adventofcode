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
    let segment = { start: { x: 494, y: 9 }, end: { x: 502, y: 9 } };

    let obstacles = { '498x9': ROCK, '499x9': ROCK, '500x9': ROCK, '501x9': ROCK, '502x9': ROCK };
    let bottom = 9;

    return { obstacles, bottom };
}

module.exports = { solve1 };