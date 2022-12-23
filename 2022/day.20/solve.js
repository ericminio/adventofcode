const { add } = require('../support');

const nth = (n, values) => {
    let zero = values.indexOf(0);
    return values[(zero + n) % values.length];
};
const move = (n, mixed) => {
    mixed = [1, 2, -3, 4, 0, 3, -2];
};
const solve1 = (file) => {
    let mixed = [1, 2, -3, 0, 3, 4, -2];
    move(4, mixed);
    mixed = [1, 2, -3, 4, 0, 3, -2];

    return [1000, 2000, 3000].map(n => nth(n, mixed)).reduce(add);
};

const solve2 = (file) => {
    return 15;
};

module.exports = { solve1, solve2, nth };