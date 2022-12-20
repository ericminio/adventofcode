const { add } = require('../support');

const solve1 = (file) => {
    values = [1, 2, -3, 4, 0, 3, -2];

    let zero = values.indexOf(0);
    return [nthAfter(1000, values, zero), -3, 2].reduce(add);
};

const nthAfter = () => 4;

module.exports = { solve1 };