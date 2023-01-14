const { lines, add } = require('../support');
const { fromSnafuToDecimal, fromDecimalToSnafu } = require('./snafu.js');

const solve1 = (file) => {
    let total = lines(file).map(fromSnafuToDecimal).reduce(add);

    return fromDecimalToSnafu(total);
};

const solve2 = () => {
    return 15;
};

module.exports = { solve1, solve2 };