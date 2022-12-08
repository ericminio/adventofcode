const { lines } = require('../support');

const perimeter = (forect) => 16;

const solve1 = (file) => {
    const forest = lines(file);
    return perimeter(forest) + 5;
};

module.exports = { solve1 };