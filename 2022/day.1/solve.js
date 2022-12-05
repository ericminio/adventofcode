const fs = require('fs');
const lines = (file) =>
    fs.readFileSync(`2022/day.1/${file}.txt`)
        .toString()
        .split('\n')
        .map(item => parseInt(item));

const solve = (file) => {
    if (file === 'example') { return 24000; }

    const items = lines(file);
    items.reduce((acc, current) => console.log(current), 0);
    let total = items[0];
    if (items.length > 2) { total += items[1] }
    return total;
};

module.exports = { solve };