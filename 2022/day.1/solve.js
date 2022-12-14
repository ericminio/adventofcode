const { descending, groupsOfNumbers, orderDescending, total } = require('../support');

const solve1 = (file) => {
    return groupsOfNumbers(file)
        .map(group => total(group))
        .sort(descending)[0];
};

const solve2 = (file) => {
    const totals = groupsOfNumbers(file).map(group => total(group));
    orderDescending(totals);

    return totals[0] + totals[1] + totals[2];
};

module.exports = { solve: solve1, solve1, solve2 };