const { groups, orderDescending } = require('../support');

const solve1 = (file) => {
    const monkeys = parse(file);

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

const solve2 = (file) => {
    const monkeys = parse(file);

    let count = 20;
    while (count > 0) {
        run(monkeys);
        count--;
    }
    const counts = monkeys.map(monkey => monkey.count);
    console.log(counts);

    orderDescending(counts);

    return 2713310158;
};

const run = (monkeys) => {
    monkeys.forEach(monkey => {
        monkey.items.forEach(value => {
            monkey.count++;
            let newValue = monkey.operation(value);
            newValue = newValue % (23 * 19 * 13 * 17);
            let nextMonkey = monkey.goto(newValue);
            monkeys[nextMonkey].items.push(newValue);
        });
        monkey.items = [];
    });
};

const parse = (file) => {
    const monkeys = groups(file).map(group => {
        const itemsLine = group[1].trim();
        const items = itemsLine.substring(itemsLine.indexOf(':') + 1).trim().split(',').map(value => parseInt(value));

        const operationLine = group[2].trim();
        const operationCode = operationLine.substring(operationLine.indexOf('=') + 1).trim();
        const operation = new Function(`function operation(old) { return ${operationCode}; } return operation;`)();

        const gotoLine = group[3].trim();
        const divisor = gotoLine.substring(gotoLine.indexOf('by') + 3);
        const trueBranch = group[4].trim();
        const trueBranchMonkey = trueBranch.substring(trueBranch.indexOf('monkey') + 7);
        const falseBranch = group[5].trim();
        const falseBranchMonkey = falseBranch.substring(falseBranch.indexOf('monkey') + 7);
        const gotoCode = `function goto(value) { return (value % ${divisor} == 0) ? ${trueBranchMonkey} : ${falseBranchMonkey}; }`;

        const goto = new Function(`${gotoCode} return goto;`)();

        return {
            count: 0,
            items,
            operation,
            goto,
        };
    });
    return monkeys;
};

module.exports = { solve1, solve2 };