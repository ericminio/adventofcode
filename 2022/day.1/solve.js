const fs = require('fs');
const input = (file) => fs.readFileSync(file).toString();
const groups = (file) => input(file).split(/\n\n/).map(items => items.split('\n'));
const numberOrZero = (item => Number.isNaN(parseInt(item)) ? 0 : parseInt(item));
const groupsOfNumbers = (file) => groups(file).map(items => items.map(item => numberOrZero(item)));
const total = (array) => array.reduce((acc, current) => acc += current, 0);
const orderDescending = (array) => { array.sort((a, b) => b - a); }

const solve1 = (file) => {
    const totals = groupsOfNumbers(file).map(group => total(group));

    let max = 0;
    totals.forEach(total => {
        if (total > max) { max = total; }
    });
    return max;
};

const solve2 = (file) => {
    const totals = groupsOfNumbers(file).map(group => total(group));

    orderDescending(totals);
    return totals[0] + totals[1] + totals[2];
};

module.exports = { solve: solve1, solve1, solve2 };