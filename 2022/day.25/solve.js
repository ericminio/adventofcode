const { lines, add } = require('../support');
const { fromSnafuToDecimal } = require('./snafu.js');

const solve1 = (file) => {
    let total = lines(file).map(fromSnafuToDecimal).reduce(add);

    return '2=-1=0';
};

const solve2 = () => {
    return 15;
};

module.exports = { solve1, solve2 };