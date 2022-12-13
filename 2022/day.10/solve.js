const { lines, sum } = require('../support');

const logCycle = (log, line, cycle, register) => {
    log[cycle] = { line, strength: register * cycle };
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
    let cycle = 1;
    let sprite = { position: 1 };
    let screen = {};

    const line = lines[0];
    display(sprite, screen, cycle - 1);

    return 15;
};

const display = (sprite, screen, crt) => {
    if (Math.abs(crt - sprite.position) < 2) {
        screen[crt] = '#';
    }
    else {
        screen[crt] = '.';
    }
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