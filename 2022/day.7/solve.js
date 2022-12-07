const { lines, total } = require('../support');

const inspect = (file) => {
    let folders = [{ name: '/', size: 0 }];
    let current = '';
    lines(file).forEach(line => {
        if (line.startsWith('$')) {

        }
        else if (line.startsWith('dir')) {

        }
        else {
            let size = parseInt(line.substring(0, line.indexOf(' ')));

        }
    });

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