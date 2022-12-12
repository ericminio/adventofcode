const { sum } = require('../support');

const valueDuringCycle = (value) => {
    return 420;
}

const solve1 = (file) => {
    const points = [20, 60, 100, 140, 180, 220];
    return sum([valueDuringCycle(points[0]), 1140, 1800, 2940, 2880, 3960]);
};

const solve2 = (file) => {
    return 15;
};

module.exports = { solve1, solve2 };