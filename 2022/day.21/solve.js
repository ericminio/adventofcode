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
    let rootDefinition = cellDefinitions.find(line => line.startsWith('root'));
    let pattern = /root:\s(.*)\s.\s(.*)/;
    let [ monkey1, monkey2 ] = pattern.exec(rootDefinition).splice(1);
    let sheet;
    let value = 0;
    let formula = '(4 + 2 * humn - 3) / 4';

    do {
        value ++;
        sheet = tryWith(value, cellDefinitions);
    } while (! equalityCheckPasses(sheet, monkey1, monkey2));

    return value;
};

const equalityCheckPasses = (sheet, monkey1, monkey2) => {
    return sheet.values[monkey1] == sheet.values[monkey2];
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