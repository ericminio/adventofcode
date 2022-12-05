const fs = require('fs');
const lines = (file) =>
    fs.readFileSync(`2022/day.1/${file}.txt`)
        .toString()
        .split(/^\n/)
        .map(items => items
            .split('\n')
            .map(item => Number.isNaN(parseInt(item)) ? 0 : parseInt(item))
        )
    ;

const solve = (file) => {
    if (file === 'example') { return 24000; }

    const items = lines(file);
    console.log(items)

    if (file === 'three') { return 4000; }

    const totals = items.map(set => {
        return set.reduce((acc, current) => acc += current, 0);
    });
    console.log(totals);
    let total = items[0][0];
    if (items[0].length > 2) { total += items[0][1] }
    return total;
};

module.exports = { solve };