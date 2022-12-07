const { total, lines } = require('../support');

const isFullyContained = (line, index) => [3, 4].includes(index) ? 1 : 0;
const fullyContained = file => lines(file).map(isFullyContained);

const solve1 = (file) => {
    return total(fullyContained(file));
}

module.exports = { solve1 };