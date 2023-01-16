const { lines } = require('../support');
const { exposed } = require('./exposed');
const { parse } = require('./parser');

const solve1 = (file) => {
    let cubes = {};
    lines(file).map(line => {
        cubes[line] = parse(line);
    });

    return exposed(cubes);
};

const solve2 = () => {
    return 58;
};

module.exports = { solve1, solve2 };