const { scores1, total, scores2 } = require('../support');

const solve1 = (file) => {
    return total(scores1(file));
};

const solve2 = (file) => {
    console.log(scores2(file));
    return total(scores2(file));
};

module.exports = { solve1, solve2 };