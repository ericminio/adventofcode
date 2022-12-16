const { groups, add } = require('../support');

const solve1 = (file) => {
    const pairs = parse(file);
    console.log(pairs);

    const statuses = [statusOf(pairs[0]), 1, 0, 1, 0, 1, 0, 0]

    return statuses.map((value, index) => (index + 1) * value).reduce(add);
};

const statusOf = (pair) => {
    const left = pair[0];
    const right = pair[1];

    return compareList(left, right);
};
const DONT_KNOW_YET = 2;
const RIGHT_ORDER = 1;
const NOT_RIGHT_ORDER = 0;
const compareList = (left, right) => {
    let index = 0;
    let result = compareItem(left[index], right[index]);
    while (result === DONT_KNOW_YET) {
        index++;
        result = compareItem(left[index], right[index]);
    }
    return result;
};
const compareItem = (left, right) => {
    if (left === undefined && right !== undefined) { return RIGHT_ORDER; }
    if (left !== undefined && right === undefined) { return NOT_RIGHT_ORDER; }
    return RIGHT_ORDER;
};

const parse = (file) => {
    return groups(file).map(group => group.map(list => eval(list)));
}

module.exports = { solve1 };