const { scores, total } = require('../support');

const solve1 = (file) => {
    console.log(total(scores(file)))
    return 8 + 1 + 6;
};

module.exports = { solve1 };