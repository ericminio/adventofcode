const { lines, sum } = require('../support');

const points = [20, 60, 100, 140, 180, 220];
const logCycle = (log, cycle, register) => {
    log[cycle] = { strength: register * cycle };
    return cycle + 1;
};
const valueDuringCycle = (cycle, log) => {
    return log[cycle].strength;
}

const solve1 = (file) => {
    const input = lines(file);
    const log = parse(input);
    return sum(points.map(point => valueDuringCycle(point, log)));
};

const solve2 = (file) => {
    return 15;
};

const parse = (lines) => {
    const log = {};
    let cycle = 1;
    let register = 1;
    for (var i = 0; i < lines.length; i++) {
        const line = lines[i];
        cycle = logCycle(log, cycle, register);
        if (line !== 'noop') {
            cycle = logCycle(log, cycle, register);
            register += parseInt(line.substring(5));
        }
    }

    return log;
}

module.exports = { solve1, solve2 };