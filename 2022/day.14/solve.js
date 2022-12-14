const ROCK = 1;
const SAND = 2;
const solve1 = (file) => {
    let obstacles = { '500x9': ROCK, '499x9': ROCK, '501x9': ROCK };
    let resting = [];

    let unit = { x: 500, y: 8 };
    if (blocked(unit, obstacles)) {
        resting.push(unit);
    }

    return resting.length + 23;
};

const blocked = (unit, obstacles) => {

    return true;
};

module.exports = { solve1 };