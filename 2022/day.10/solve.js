const { lines, sum } = require('../support');

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

    return sum([20, 60, 100, 140, 180, 220].map(point => cycles[point - 1].strength));
};

const solve2 = (file) => {
    const input = lines(file);
    const cycles = run(input);

    const screen = cycles
        .map(logged => Math.abs((logged.cycle % 40) - logged.spritePosition) < 2)
        .map(lit => lit ? '#' : '.');

    const size = 40;
    const rows = [];
    for (let i = 0; i < screen.length; i += size) {
        const row = screen.slice(i, i + size);
        rows.push(row.join(''));
    }

    return rows;
};

module.exports = { solve1, solve2 };