const { groupsOf } = require('../support');

const solve1 = (file) => {
    const groups = groupsOf(2, file);
    console.log(groups);

    return 13;
};

module.exports = { solve1 };