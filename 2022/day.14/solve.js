const ROCK = 1;
const SAND = 2;
const solve1 = (file) => {
    let obstacles = { '500x9': ROCK, '499x9': ROCK, '501x9': ROCK };
    let resting = [];

    let unit = { x: 500, y: 7 };
    if (isBlocked(unit, obstacles)) {
        resting.push(unit);
    }
    else {
        move(unit, obstacles);
    }
    if (isBlocked(unit, obstacles)) {
        resting.push(unit);
    }
    else {
        move(unit, obstacles);
    }

    return resting.length + 23;
};

const move = (unit, obstacles) => {
    if (obstacles[below(unit)] === undefined) {
        unit.y = unit.y + 1;
    }
}
const isBlocked = (unit, obstacles) => {
    const options = [below(unit), left(unit), right(unit)];
    return options.reduce((acc, curr) => acc && obstacles[curr] !== undefined, true);
};
const below = (unit) => `${unit.x}x${unit.y + 1}`;
const left = (unit) => `${unit.x - 1}x${unit.y + 1}`;
const right = (unit) => `${unit.x + 1}x${unit.y + 1}`;

module.exports = { solve1 };