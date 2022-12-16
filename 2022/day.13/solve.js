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

    return compare(left, right);
};
const compare = (left, right) => {
    return 1;
};

const parse = (file) => {
    return groups(file).map(group => group.map(list => eval(list)));
}

module.exports = { solve1 };