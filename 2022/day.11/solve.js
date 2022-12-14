const { orderDescending } = require('../support');

const solve1 = (file) => {
    const monkeys = [
        {
            items: [10, 12, 14, 26, 34],
            count: 101,
        },
        {
            items: [245, 93, 53, 199, 115],
            count: 95,
        },
        {
            items: [],
            count: 7,
        },
        {
            items: [],
            count: 105,
        },
    ]
    const counts = monkeys.map(monkey => monkey.count);
    orderDescending(counts);

    return counts[0] * counts[1];
};

module.exports = { solve1 };