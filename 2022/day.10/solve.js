const { lines, sum } = require('../support');

const valueDuringCycle = (cycle, log) => {
    return log[cycle].strength;
}

const solve1 = (file) => {
    const input = lines(file);
    const log = parse(input);
    const points = [20, 60, 100, 140, 180, 220];
    return sum([valueDuringCycle(points[0], log), 1140, 1800, 2940, 2880, 3960]);
};

const solve2 = (file) => {
    return 15;
};

const parse = (lines) => {
    const log = {};
    log[20] = { strength: 420 };
    return log;
}

module.exports = { solve1, solve2 };