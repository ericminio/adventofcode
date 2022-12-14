const { groups, orderDescending } = require('../support');

const solve1 = (file) => {
    const input = groups(file).map(group => {
        const itemsLine = group[1].trim();
        const items = itemsLine.substring(itemsLine.indexOf(':') + 1).trim().split(',').map(value => parseInt(value));

        const operationLine = group[2].trim();
        const operation = operationLine;

        return {
            count: 0,
            items,
            operation,
        };
    });
    console.log(input);
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
    ];
    let count = 20;
    while (count > 0) {
        monkeys.forEach(monkey => {
            monkey.items.forEach(value => {
                monkey.count++;
                let newValue = monkey.operation(value);
                newValue = Math.floor(newValue / 3);
                let nextMonkey = monkey.goto(newValue);
                monkeys[nextMonkey].items.push(newValue);
            });
            monkey.items = [];
        });
        count--;
    }

    const counts = monkeys.map(monkey => monkey.count);
    orderDescending(counts);

    return counts[0] * counts[1];
};

module.exports = { solve1 };