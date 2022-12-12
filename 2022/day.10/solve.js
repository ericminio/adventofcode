const { lines, sum } = require('../support');

const points = [20, 60, 100, 140, 180, 220];
const logCycle = (log, cycle, register) => {
    log[cycle] = { strength: register * cycle };
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
        if (line === 'noop') {
            logCycle(log, cycle, register);
            cycle++;
        }
        else {
            log[cycle] = { strength: register * cycle };
            cycle++;
            log[cycle] = { strength: register * cycle };
            cycle++;
            register += parseInt(line.substring(5));
        }
    }

    return log;
}

module.exports = { solve1, solve2 };