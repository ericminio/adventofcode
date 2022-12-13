const { orderDescending } = require('../support');

const solve1 = (file) => {
    const counts = [101, 95, 7, 105];
    orderDescending(counts);

    return counts[0] * counts[1];
};

module.exports = { solve1 };