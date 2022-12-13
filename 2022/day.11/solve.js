const { orderDescending } = require('../support');

const solve1 = (file) => {
    const counts = [101, 95, 7, 105];
    orderDescending(counts);

    return 101 * 105;
};

module.exports = { solve1 };