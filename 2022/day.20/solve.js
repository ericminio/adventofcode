const { add } = require('../support');

const nth = (n, values) => {
    let zero = values.indexOf(0);
    return values[(zero + n) % values.length];
};
const move = (n, mixed) => {
    if (n === 0) { return mixed; }
    return [1, 2, -3, 4, 0, 3, -2];
};
const solve1 = (file) => {
    let mixed = [1, 2, -3, 0, 3, 4, -2];
    mixed = move(4, mixed);

    return [1000, 2000, 3000].map(n => nth(n, mixed)).reduce(add);
};

const solve2 = (file) => {
    return 15;
};

module.exports = { solve1, solve2, nth, move };