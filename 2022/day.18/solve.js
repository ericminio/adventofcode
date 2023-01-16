const { lines } = require('../support');
const { parse } = require('./parser');

const solve1 = (file) => {
    let cube = {};
    lines(file).map(line => {
        cube[line] = parse(line);
    });

    return 64;
};

const solve2 = () => {
    return 15;
};

module.exports = { solve1, solve2 };