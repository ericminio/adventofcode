const { total } = require('../support');

const solve1 = (file) => {
    return total([584, 94853, 24933642, 48381165].filter(size => size <= 100000));
};

module.exports = { solve1 };