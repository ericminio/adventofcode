const { add, descending, groupsOfNumbers, total } = require('../support');

const solve1 = (file) => {
    return groupsOfNumbers(file)
        .map(group => group.reduce(add))
        .sort(descending)
        .slice(0, 1)
        .reduce(add)
};

const solve2 = (file) => {
    return groupsOfNumbers(file)
        .map(group => total(group))
        .sort(descending)
        .slice(0, 3)
        .reduce(add);
};

module.exports = { solve: solve1, solve1, solve2 };