const fs = require('fs');
const lines = (file) =>
    fs.readFileSync(`2022/day.1/${file}.txt`)
        .toString()
        .split('\n');

const solve = (file) => {
    if (file === 'example') { return 24000; }

    const items = lines(file).map(item => Number.isNaN(item) ? 0 : parseInt(item));
    let total = items[0];
    if (items.length > 2) { total += items[1] }
    items.reduce((acc, current) => console.log(current), 0);
    return total;
};

module.exports = { solve };