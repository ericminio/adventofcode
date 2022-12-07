const { lines, total } = require('../support');

const separator = '/';
const isCommand = (line) => line.startsWith('$');
const isChangeDirToParent = (line) => line === '$ cd ..';
const isChangeDirDown = (line) => line.startsWith('$ cd ') && !isChangeDirToParent(line);
const isFileInfo = (line) => !isCommand(line) && !line.startsWith('dir');
const fileInfoPattern = /^(.*)\s(.*)$/;
const folderInfoBuilder = (name) => ({ name, size: 0 });
const inspect = (file) => {
    let folders = [];
    let current = '';
    lines(file).forEach(line => {
        if (isChangeDirToParent(line)) {
            current = current.substring(0, current.lastIndexOf(separator))
        }
        if (isChangeDirDown(line)) {
            let name = line.substring(5).trim();
            current = name === separator ? separator : current + `${separator}${name}`;
            folders.push({ name: current, size: 0 });
        }
        if (isFileInfo(line)) {
            let size = parseInt(fileInfoPattern.exec(line)[1]);
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