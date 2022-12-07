const { lines, total } = require('../support');

const inspect = (file) => {
    let folders = [];
    let current = '';
    lines(file).forEach(line => {
        if (line.startsWith('$')) {
            if (line.startsWith('$ cd ..')) {
                current = current.substring(0, current.lastIndexOf('/'))
            }
            else if (line.startsWith('$ cd ')) {
                let name = line.substring(5).trim();
                if (name === '/') {
                    current = '/';
                }
                else {
                    current += `/${name}`;
                }
                folders.push({ name: current, size: 0 });
            }
        }
        else if (line.startsWith('dir')) {

        }
        else if (!line.startsWith('dir')) {
            let size = parseInt(line.substring(0, line.indexOf(' ')));
            folders
                .filter(folder => current.startsWith(folder.name))
                .forEach(folder => folder.size += size);
        }
    });

    return folders;
};

const solve1 = (file) => {
    return total(
        inspect(file)
            .filter(folder => folder.size <= 100000)
            .map(folder => folder.size)
    );
};

const solve2 = (file) => {
    const folders = inspect(file);
    const used = folders.find(folder => folder.name === '/').size;
    const unused = 70000000 - used;
    const needed = 30000000 - unused;
    const candidates = folders.filter(folder => folder.size >= needed);
    candidates.sort((a, b) => a.size - b.size);

    return candidates[0].size;
};

module.exports = { solve1, solve2 };