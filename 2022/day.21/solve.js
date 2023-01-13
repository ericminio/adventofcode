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

    return sheet.values['root'];
};

const solve2 = (file) => {
    let cellDefinitions = lines(file);
    let sheet;
    let value = 0;

    do {
        value ++;
        sheet = tryWith(value, cellDefinitions);
    } while (! equalityCheckPasses(sheet));

    return value;
};

const equalityCheckPasses = (sheet) => {
    return sheet.values['pppw'] == sheet.values['sjmn'];
};

const tryWith = (value, cellDefinitions) => {
    let cells = cellDefinitions.map(parseCell);
    let sheet = { cells, values: {}};
    cells.forEach(cell => {
        sheet.values[cell.name] = cell.value;
    });
    sheet.values['humn'] = value;
    compute(sheet);

    return sheet;
};


module.exports = { solve1, solve2 };