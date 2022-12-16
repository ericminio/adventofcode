const { groups } = require('../support');

const solve1 = (file) => {
    const pairs = parse(file);
    console.log(pairs);

    const statuses = [1, 1, 0, 1, 0, 6, 0, 0]

    return 13;
};

const parse = (file) => {
    return groups(file).map(group => group.map(list => eval(list)));
}

module.exports = { solve1 };