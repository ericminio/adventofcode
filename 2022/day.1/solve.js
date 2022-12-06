const { groupsOfNumbers, orderDescending, total } = require('./utils');

const solve1 = (file) => {
    const totals = groupsOfNumbers(file).map(group => total(group));
    orderDescending(totals);

    return totals[0];
};

const solve2 = (file) => {
    const totals = groupsOfNumbers(file).map(group => total(group));
    orderDescending(totals);

    return totals[0] + totals[1] + totals[2];
};

module.exports = { solve: solve1, solve1, solve2 };