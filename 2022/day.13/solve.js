const { groups, add } = require('../support');

const solve1 = (file) => {
    const pairs = parse(file);
    console.log(pairs);

    const statuses = [1, 1, 0, 1, 0, 1, 0, 0]

    return statuses.map((value, index) => (index + 1) * value).reduce(add);
};

const parse = (file) => {
    return groups(file).map(group => group.map(list => eval(list)));
}

module.exports = { solve1 };