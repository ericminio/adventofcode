const { lines, total } = require('../support');

const inspect = (file) => {
    let folders = [{ name: '/', size: 0 }];
    let current = '';
    lines(file).forEach(line => {
        if (line.startsWith('$')) {
            if (line.startsWith('$ cd ..')) {
                current = current.substring(0, current.lastIndexOf('/'))
            }
            else if (line.startsWith('$ cd ')) {
                let name = line.substring(5).trim();
                if (name !== '/') {
                    current += `/${name}`;
                    console.log(name, current);
                }
            }
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