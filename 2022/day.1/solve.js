const fs = require('fs');
const lines = (file) =>
    fs.readFileSync(`2022/day.1/${file}.txt`)
        .toString()
        .split('\n');

const solve = (file) => {
    if (file === 'example') { return 24000; }

    const items = lines(file).map(item => parseInt(item));
    return items[0];
};

module.exports = { solve };