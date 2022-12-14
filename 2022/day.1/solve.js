const { add, descending, groupsOfNumbers, orderDescending, total } = require('../support');

const solve1 = (file) => {
    return groupsOfNumbers(file)
        .map(group => total(group))
        .sort(descending)[0];
};

const solve2 = (file) => {
    return groupsOfNumbers(file)
        .map(group => total(group))
        .sort(descending)
        .slice(0, 3)
        .reduce(add)
        ;
};

module.exports = { solve: solve1, solve1, solve2 };