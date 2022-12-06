const { scores, total } = require('../support');

const solve1 = (file) => {
    return total(scores(file));
};

module.exports = { solve1 };