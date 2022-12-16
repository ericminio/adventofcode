const { groupsOf } = require('../support');

const solve1 = (file) => {
    const groups = parse(file);
    console.log(groups);

    return 13;
};

const parse = (file) => {
    return groupsOf(2, file);
}

module.exports = { solve1 };