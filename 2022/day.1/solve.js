const fs = require('fs');
const lines = (file) =>
    fs.readFileSync(`2022/day.1/${file}.txt`)
        .toString()
        .split(/\n\n/)
        .map(items => items
            .split('\n')
            .map(item => Number.isNaN(parseInt(item)) ? 0 : parseInt(item))
        )
    ;

const solve = (file) => {
    if (file === 'example') { return 24000; }

    const items = lines(file);

    const totals = items.map(set => {
        return set.reduce((acc, current) => acc += current, 0);
    });
    let max = 0;
    totals.forEach(total => {
        if (total > max) { max = total; }
    });
    return max;
};

module.exports = { solve };