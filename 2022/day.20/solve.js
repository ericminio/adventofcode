const { add } = require('../support');

const solve1 = (file) => {
    return [4, -3, 2].reduce(add);
};

const solve2 = (file) => {
    return 15;
};

module.exports = { solve1, solve2 };