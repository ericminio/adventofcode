const { orderDescending } = require('../support');

const solve1 = (file) => {
    const monkeys = [
        {
            count: 0,
            items: [79, 98],
            operation: old => old * 19,
            goto: value => value % 23 == 0 ? 2 : 3,
        },
        {
            count: 0,
            items: [54, 65, 75, 74],
            operation: old => old + 6,
            goto: value => value % 19 == 0 ? 2 : 0,
        },
        {
            count: 0,
            items: [79, 60, 97],
            operation: old => old * old,
            goto: value => value % 13 == 0 ? 1 : 3,
        },
        {
            count: 0,
            items: [74],
            operation: old => old + 3,
            goto: value => value % 17 == 0 ? 0 : 1,
        },
    ]
    monkeys.forEach(monkey => {
        monkey.items.forEach(value => {
            let newValue = monkey.operation(value);
            newValue = newValue / 3;
            let nextMonkey = monkey.goto(newValue);
            monkeys[nextMonkey].items.push(newValue);
        });
        monkey.items = [];
    });
    console.log(monkeys);

    const counts = [101, 95, 7, 105];
    orderDescending(counts);

    return counts[0] * counts[1];
};

module.exports = { solve1 };