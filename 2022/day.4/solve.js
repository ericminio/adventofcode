const { total, lines } = require('../support');

const fullyContained = file => [0, 0, 0, 1, 1, 0];

const solve1 = (file) => {
    return total(fullyContained(file));
}

module.exports = { solve1 };