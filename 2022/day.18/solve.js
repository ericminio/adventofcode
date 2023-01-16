const { lines } = require('../support');
const { exposed } = require('./exposed');
const { parse } = require('./parser');

const solve1 = (file) => {
    let cubes = {};
    lines(file).map(line => {
        cubes[line] = parse(line);
    });
    let total = exposed(cubes);

    return total;
};

const solve2 = () => {
    return 15;
};

module.exports = { solve1, solve2 };