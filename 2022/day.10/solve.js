const { lines, add } = require('../support');

const logCycle = (log, cycle, register) => {
    log[cycle] = {
        cycle,
        strength: register * (cycle + 1),
        spritePosition: register,
    };
};
const run = (lines) => {
    const log = [];
    let cycle = 0;
    let register = 1;
    for (var i = 0; i < lines.length; i++) {
        const line = lines[i];
        logCycle(log, cycle, register);
        cycle++;
        if (line !== 'noop') {
            logCycle(log, cycle, register);
            register += parseInt(line.substring(5));
            cycle++;
        }
    }

    return log;
};

const solve1 = (file) => {
    const input = lines(file);
    const cycles = run(input);

    return [ 20, 60, 100, 140, 180, 220 ].map(point => cycles[point - 1].strength).reduce(add);
};

const solve2 = (file) => {
    const input = lines(file);
    const cycles = run(input);

    const screen = cycles
        .map(logged => Math.abs((logged.cycle % 40) - logged.spritePosition) < 2)
        .map(lit => lit ? '#' : '.');

    const rowSize = 40;
    const rows = [];
    for (let i = 0; i < screen.length; i += rowSize) {
        const row = screen.slice(i, i + rowSize);
        rows.push(row.join(''));
    }

    return rows;
};

module.exports = { solve1, solve2 };