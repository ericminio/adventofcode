const { lines, sum } = require('../support');

const logCycle = (log, line, cycle, register) => {
    log[cycle] = {
        strength: register * cycle,
        spritePosition: register,
    };
};
const run = (lines) => {
    const log = [];
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

const solve1 = (file) => {
    const input = lines(file);
    const log = run(input);
    const points = [20, 60, 100, 140, 180, 220];

    return sum(points.map(point => log[point].strength));
};

const solve2 = (file) => {
    const input = lines(file);
    const cycles = run(input);

    const screen = [];
    for (var index = 1; index <= Object.keys(cycles).length; index++) {
        const logged = cycles[index];
        screen[index - 1] = (Math.abs(((index - 1) % 40) - logged.spritePosition) < 2) ? '#' : '.';
    }

    const size = 40;
    const rows = [];
    for (let i = 0; i < screen.length; i += size) {
        const row = screen.slice(i, i + size);
        rows.push(row.join(''));
    }

    return rows;
};

module.exports = { solve1, solve2 };