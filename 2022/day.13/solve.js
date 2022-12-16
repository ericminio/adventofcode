const { groups } = require('../support');

const solve1 = (file) => {
    const pairs = parse(file);
    console.log(pairs);

    return 13;
};

const parse = (file) => {
    return groups(file).map(group => group.map(list => eval(list)));
}

module.exports = { solve1 };