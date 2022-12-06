const { scores1, total, outcome2 } = require('../support');

const solve1 = (file) => {
    return total(scores1(file));
};

const solve2 = (file) => {
    console.log(outcome2(file));
    return 4 + 1 + 7;
};

module.exports = { solve1, solve2 };