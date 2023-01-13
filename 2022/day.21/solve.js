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
    compute(sheet, 'root');

    return sheet.values['root'];
};

const solve2 = (file) => {
    let cellDefinitions = lines(file);

    let cells = cellDefinitions.map(parseCell);
    let sheet = { cells, values: {}};
    cells.forEach(cell => {
        sheet.values[cell.name] = cell.value;
    });
    compute(sheet, 'root');

    console.log(sheet.values['pppw']);
    console.log(sheet.values['sjmn']);

    return 301;
};

module.exports = { solve1, solve2 };