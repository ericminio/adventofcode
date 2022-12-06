const { scores1, total } = require('../support');

const solve1 = (file) => {
    return total(scores1(file));
};

const solve2 = (file) => {
    return 4 + 1 + 7;
};

module.exports = { solve1, solve2 };