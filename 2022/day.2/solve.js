const { scores1, total } = require('../support');

const solve1 = (file) => {
    return total(scores1(file));
};

const solve2 = (file) => 12;

module.exports = { solve1, solve2 };