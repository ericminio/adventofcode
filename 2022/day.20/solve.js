const { add } = require('../support');

const nth = (n, values) => {
    let zero = values.indexOf(0);
    return values[(zero + n) % values.length];
};
const solve1 = (file) => {
    let mixed = [1, 2, -3, 4, 0, 3, -2];

    return [nth(1000, mixed), -3, 2].reduce(add);
};

const solve2 = (file) => {
    return 15;
};

module.exports = { solve1, solve2, nth };