const { descending, groups, multiply } = require('../support');

const solve1 = (file) => {
    const { monkeys } = parse(file);
    run(20, monkeys, value => Math.floor(value / 3));

    return monkeyBusiness(monkeys);
};

const solve2 = (file) => {
    const { monkeys, keepCalm } = parse(file);
    run(10000, monkeys, keepCalm);

    return monkeyBusiness(monkeys);
};

const monkeyBusiness = (monkeys) => {
    return monkeys.map(monkey => monkey.count).sort(descending).slice(0, 2).reduce(multiply);
};
const run = (n, monkeys, keepCalm) => {
    while (n > 0) {
        runRound(monkeys, keepCalm);
        n--;
    }
};
const runRound = (monkeys, keepCalm) => {
    monkeys.forEach(monkey => {
        monkey.items.forEach(value => {
            monkey.count++;
            let newValue = monkey.operation(value);
            newValue = keepCalm(newValue);
            let nextMonkey = monkey.goto(newValue);
            monkeys[nextMonkey].items.push(newValue);
        });
        monkey.items = [];
    });
};

const parse = (file) => {
    let divisors = 1;
    const monkeys = groups(file).map(group => {
        const itemsLine = group[1].trim();
        const items = itemsLine.substring(itemsLine.indexOf(':') + 1).trim().split(',').map(value => parseInt(value));

        const operationLine = group[2].trim();
        const operationCode = operationLine.substring(operationLine.indexOf('=') + 1).trim();
        const operation = new Function(`function operation(old) { return ${operationCode}; } return operation;`)();

        const gotoLine = group[3].trim();
        const divisor = gotoLine.substring(gotoLine.indexOf('by') + 3);
        divisors *= parseInt(divisor);
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
    return { monkeys, keepCalm: value => value % divisors };
};

module.exports = { solve1, solve2 };