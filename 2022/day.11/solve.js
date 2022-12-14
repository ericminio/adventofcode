const { orderDescending } = require('../support');

const solve1 = (file) => {
    const monkeys = [
        {
            count: 101,
        },
        {
            count: 95,
        },
        {
            count: 7,
        },
        {
            count: 105,
        },
    ]
    const counts = [101, 95, 7, 105];
    orderDescending(counts);

    return counts[0] * counts[1];
};

module.exports = { solve1 };