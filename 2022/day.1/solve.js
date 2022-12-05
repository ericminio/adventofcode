const fs = require('fs');
const lines = (file) =>
    fs.readFileSync(`${__dirname}/${file}.txt`)
        .toString()
        .split(/\n\n/)
        .map(items => items
            .split('\n')
            .map(item => Number.isNaN(parseInt(item)) ? 0 : parseInt(item))
        )
    ;


const arrayOfTotals = (lines) => {
    return lines.map(set => set.reduce((acc, current) => acc += current, 0));
};

const solve1 = (file) => {
    const items = lines(file);
    const totals = arrayOfTotals(items);

    let max = 0;
    totals.forEach(total => {
        if (total > max) { max = total; }
    });
    return max;
};

const solve2 = (file) => {
    const items = lines(file);
    const totals = arrayOfTotals(items);
    totals.sort((a, b) => b - a);

    return totals[0] + totals[1] + totals[2];
};

module.exports = { solve: solve1, solve1, solve2 };