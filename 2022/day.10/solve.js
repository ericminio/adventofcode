const { lines, sum } = require('../support');

const logCycle = (log, line, cycle, register) => {
    log[cycle] = { cycle, line, spritePosition: register, strength: register * cycle };
};
const valueDuringCycle = (cycle, log) => {
    return log[cycle].strength;
}

const solve1 = (file) => {
    const input = lines(file);
    const log = run(input);
    const points = [20, 60, 100, 140, 180, 220];

    return sum(points.map(point => valueDuringCycle(point, log)));
};

const solve2 = (file) => {
    const input = lines(file);
    const cycles = run(input);
    let screen = {};

    let logged;
    for (var index = 1; index <= 50; index++) {
        logged = cycles[index];
        screen[index - 1] = (Math.abs(((index - 1) % 40) - logged.spritePosition) < 2) ? '#' : '.';
        console.log(`crt ${index - 1} ${logged.line}\tposition ${logged.spritePosition} -> ${screen[index - 1]}`);
    }

    return 15;
};

const run = (lines) => {
    const log = {};
    let cycle = 1;
    let register = 1;
    for (var i = 0; i < lines.length; i++) {
        const line = lines[i];
        logCycle(log, line, cycle, register);
        cycle++;
        if (line !== 'noop') {
            logCycle(log, line, cycle, register);
            register += parseInt(line.substring(5));
            cycle++;
        }
    }

    return log;
};

module.exports = { solve1, solve2 };