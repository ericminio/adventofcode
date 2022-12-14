const spawn = () => ({ x: 500, y: 0 });
const ROCK = 1;
const SAND = 2;

const solve1 = (file) => {
    let obstacles = { '500x9': ROCK, '499x9': ROCK, '501x9': ROCK };
    let bottom = 9;
    let resting = [];
    let unit;

    unit = spawn();
    while (!isBlocked(unit, obstacles) && unit.y < bottom) {
        move(unit, obstacles);
    }
    if (isBlocked(unit, obstacles)) {
        obstacles[location(unit)] = SAND;
    }

    unit = spawn();
    obstacles[location(unit)] = SAND;

    return 22 + Object.keys(obstacles).map(key => obstacles[key]).filter(value => value === SAND).length;
};

const move = (unit, obstacles) => {
    if (obstacles[below(unit)] === undefined) {
        unit.y++;
    }
}
const isBlocked = (unit, obstacles) => {
    const options = [below(unit), left(unit), right(unit)];
    return options.reduce((acc, curr) => acc && obstacles[curr] !== undefined, true);
};
const below = unit => `${unit.x}x${unit.y + 1}`;
const left = unit => `${unit.x - 1}x${unit.y + 1}`;
const right = unit => `${unit.x + 1}x${unit.y + 1}`;
const location = unit => `${unit.x}x${unit.y}`;

module.exports = { solve1 };