const { groups, add, lines } = require('../support');

const solve1 = (file) => {
    const pairs = groups(file).map(group => group.map(list => eval(list)));
    const statuses = pairs.map(pair => statusOf(pair));

    return statuses.map((value, index) => value === RIGHT_ORDER ? index + 1 : 0).reduce(add);
};

const solve2 = (file) => {
    const pairs = lines(file).filter(line => line.length > 0).map(list => eval(list));
    const two = [[2]];
    const six = [[6]];
    pairs.push(two);
    pairs.push(six);
    pairs.sort(compareList);

    return (pairs.indexOf(two) + 1) * (pairs.indexOf(six) + 1);
};

const statusOf = (pair) => {
    const left = pair[0];
    const right = pair[1];

    return compareList(left, right);
};
const BOTH_EMPTY = 3;
const DONT_KNOW_YET = 2;
const RIGHT_ORDER = -1;
const NOT_RIGHT_ORDER = 1;
const compareList = (left, right) => {
    let result;
    let index = -1;
    do {
        index++;
        result = compareItem(left[index], right[index]);
    }
    while (result !== RIGHT_ORDER && result !== NOT_RIGHT_ORDER && result !== BOTH_EMPTY && index < 15);

    if (result === BOTH_EMPTY) {
        result = DONT_KNOW_YET;
    }
    return result;
};
const compareItem = (left, right) => {
    if (left === undefined && right === undefined) { return BOTH_EMPTY; }
    if (left === undefined && right !== undefined) { return RIGHT_ORDER; }
    if (left !== undefined && right === undefined) { return NOT_RIGHT_ORDER; }
    if (typeof left == 'number' && typeof right == 'number') {
        if (left < right) { return RIGHT_ORDER; }
        if (left > right) { return NOT_RIGHT_ORDER; }
        return DONT_KNOW_YET;
    }
    if (typeof left == 'object' && typeof right == 'object') {
        return compareList(left, right);
    }
    if (typeof left == 'number' && typeof right == 'object') {
        return compareList([left], right);
    }
    if (typeof left == 'object' && typeof right == 'number') {
        return compareList(left, [right]);
    }

    return DONT_KNOW_YET;
};

module.exports = { solve1, solve2 };