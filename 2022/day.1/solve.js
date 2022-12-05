const fs = require('fs');
const input = (file) => fs.readFileSync(file).toString();
const groups = (file) => input(file).split(/\n\n/).map(items => items.split('\n'));
const numberOrZero = (item => Number.isNaN(parseInt(item)) ? 0 : parseInt(item));
const groupsOfNumbers = (file) => groups(file).map(items => items.map(item => numberOrZero(item)));

const elfTotals = (groups) => {
    return groups.map(group => group.reduce((acc, current) => acc += current, 0));
};

const solve1 = (file) => {
    const groups = groupsOfNumbers(file);
    const totals = elfTotals(groups);

    let max = 0;
    totals.forEach(total => {
        if (total > max) { max = total; }
    });
    return max;
};

const solve2 = (file) => {
    const groups = groupsOfNumbers(file);
    const totals = elfTotals(groups);
    totals.sort((a, b) => b - a);

    return totals[0] + totals[1] + totals[2];
};

module.exports = { solve: solve1, solve1, solve2 };