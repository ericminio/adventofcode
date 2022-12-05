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
const arrayOfTotals = (lines) => {
    return lines.map(set => {
        return set.reduce((acc, current) => acc += current, 0);
    });
}

const solve = (file) => {
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
    totals.sort();
    console.log(totals);

    return totals[0] + totals[1] + totals[2];
};

module.exports = { solve, solve2 };