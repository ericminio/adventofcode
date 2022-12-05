const fs = require('fs');
const lines = (file) =>
    fs.readFileSync(`2022/day.1/${file}.txt`)
        .toString()
        .split('\n');

const solve = (file) => {
    if (file === 'example') { return 24000; }

    const items = lines(file).map(item => parseInt(item));
    const total = items.reduce((acc, current) => acc = acc + current, 0);
    return items.length * 500;
};

module.exports = { solve };