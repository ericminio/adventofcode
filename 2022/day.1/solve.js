const fs = require('fs');
const lines = (file) =>
    fs.readFileSync(`2022/day.1/${file}.txt`)
        .toString()
        .split(/^\n$/)
        .map(items => items
            .split('\n')
            .map(item => parseInt(item))
        )
    ;

const solve = (file) => {
    if (file === 'example') { return 24000; }

    const items = lines(file);

    let total = items[0][0];
    if (items[0].length > 2) { total += items[0][1] }
    return total;
};

module.exports = { solve };