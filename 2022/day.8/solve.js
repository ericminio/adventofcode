const { lines } = require('../support');

const perimeter = (forest) => 2 * forest.length + 2 * (forest[0].length - 2);

const solve1 = (file) => {
    const forest = lines(file);
    return perimeter(forest) + 5;
};

module.exports = { solve1 };