const { groups, add } = require('../support');

const solve1 = (file) => {
    const pairs = parse(file);
    console.log(pairs);

    const statuses = [1, statusOf(pairs[1]), 0, 1, 0, 1, 0, 0]

    return statuses.map((value, index) => (index + 1) * value).reduce(add);
};

const statusOf = (pair) => {
    const left = pair[0];
    const right = pair[1];

    return compareList(left, right);
};
const BOTH_EMPTY = 2;
const DONT_KNOW_YET = 2;
const RIGHT_ORDER = 1;
const NOT_RIGHT_ORDER = 0;
const compareList = (left, right) => {
    console.log('\ncomparing lists', { left, right });
    let result;
    let index = -1;
    do {
        index++;
        result = compareItem(left[index], right[index]);
    }
    while (result !== RIGHT_ORDER && result !== NOT_RIGHT_ORDER && index < 15);

    return result;
};
const compareItem = (left, right) => {
    console.log('comparing items', { left, right });
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

const parse = (file) => {
    return groups(file).map(group => group.map(list => eval(list)));
}

module.exports = { solve1 };