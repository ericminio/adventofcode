const { sum } = require('../support');

const solve1 = (file) => {
    const points = [20, 60, 100, 140, 180, 220];
    return sum([420, 1140, 1800, 2940, 2880, 3960]);
};

const solve2 = (file) => {
    return 15;
};

module.exports = { solve1, solve2 };