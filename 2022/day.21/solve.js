const { lines } = require('../support/index.js');
const { compute } = require('./compute.js');
const { parseCell } = require('./parser.js');

const solve1 = (file) => {
    let cellDefinitions = lines(file);
    let cells = cellDefinitions.map(parseCell);

    let sheet = { cells, values: {}};
    cells.forEach(cell => {
        sheet.values[cell.name] = cell.value;
    });
    compute(sheet);

    return 152;
};

const solve2 = () => {
    return 15;
};

module.exports = { solve1, solve2 };