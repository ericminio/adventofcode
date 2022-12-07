const { total } = require('../support');

const inspect = (file) => {
    return [
        { name: '/a/e', size: 584 },
        { name: '/a', size: 94853 },
        { name: '/d', size: 24933642 },
        { name: '/', size: 48381165 },
    ]
};

const solve1 = (file) => {
    return total(
        inspect(file)
            .filter(folder => folder.size <= 100000)
            .map(folder => folder.size)
    );
};

module.exports = { solve1 };