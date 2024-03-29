const { add, lines, ascending } = require('../support');

const separator = '/';
const isCommand = (line) => line.startsWith('$');
const isChangeDirUpCommand = (line) => line === '$ cd ..';
const isChangeDirDownCommand = (line) => line.startsWith('$ cd ') && !isChangeDirUpCommand(line);
const isFileInfo = (line) => !isCommand(line) && !line.startsWith('dir');
const fileInfo = (line) => {
    let data = /^(.*)\s(.*)$/.exec(line);
    return { size: parseInt(data[1]) };
};

const initialFolderInfo = (name) => ({ name, size: 0 });
const inspect = (file) => {
    let folders = [];
    let current = '';
    lines(file).forEach(line => {
        if (isChangeDirUpCommand(line)) {
            current = current.substring(0, current.lastIndexOf(separator));
        }
        if (isChangeDirDownCommand(line)) {
            const name = line.substring(5).trim();
            current = name === separator ? separator : current + `${separator}${name}`;
            folders.push(initialFolderInfo(current));
        }
        if (isFileInfo(line)) {
            const file = fileInfo(line);
            folders
                .filter(folder => current.startsWith(folder.name))
                .forEach(folder => folder.size += file.size);
        }
    });

    return folders;
};

const solve1 = (file) => {
    return inspect(file)
        .filter(folder => folder.size <= 100000)
        .map(folder => folder.size)
        .reduce(add);
};

const solve2 = (file) => {
    const folders = inspect(file);
    const used = folders.find(folder => folder.name === '/').size;
    const unused = 70000000 - used;
    const needed = 30000000 - unused;

    return folders
        .filter(folder => folder.size >= needed)
        .map(folder => folder.size)
        .sort(ascending)
        .slice(0, 1)
        .reduce(add);
};

module.exports = { solve1, solve2 };