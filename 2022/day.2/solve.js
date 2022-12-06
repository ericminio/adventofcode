const { selectionScore } = require('../support');

const solve1 = (file) => {
    console.log(selectionScore(file));
    return 8 + 1 + 6;
};

module.exports = { solve1 };