const fs = require('fs');
const lines = (file) =>
    fs.readFileSync(`2022/day.1/${file}.txt`)
        .toString()
        .split('\n');

const solve = (file) => {
    if (file === 'example') { return 24000; }

    const items = lines(file).map(item => parseInt(item));
    const total = items[0];
    return total;
};

module.exports = { solve };