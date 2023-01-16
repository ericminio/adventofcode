const { lines } = require('../support');
const { exposed } = require('./exposed');
const { parse } = require('./parser');

const solve1 = (file) => {
    let cubes = lines(file).reduce((cubes, line) => {
        cubes[line] = parse(line);
        return cubes;
    }, {});

    return exposed(cubes);
};

const solve2 = () => {
    return 58;
};

module.exports = { solve1, solve2 };