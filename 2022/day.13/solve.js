const { groups } = require('../support');

const solve1 = (file) => {
    const pairs = parse(file);
    console.log(pairs);

    return 13;
};

const parse = (file) => {
    return groups(file);
}

module.exports = { solve1 };