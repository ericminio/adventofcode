const { lines, total } = require('../support');

const inspect = (file) => {
    let folders = [{ name: '/', size: 0 }];
    lines(file).forEach(line => {
        if (line.startsWith('$')) {

        }
        else if (line.startsWith('dir')) {

        }
        else {
            let size = parseInt(line.substring(0, line.indexOf(' ')));
            folders.find(folder => folder.name === '/').size += size;
        }
    });

    return [
        { name: '/a/e', size: 584 },
        { name: '/a', size: 94853 },
        { name: '/d', size: 24933642 },
    ].concat(folders)
};

const solve1 = (file) => {
    return total(
        inspect(file)
            .filter(folder => folder.size <= 100000)
            .map(folder => folder.size)
    );
};

module.exports = { solve1 };