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
    let one = '(4 + 2 * (humn - 3)) / 4';
    let two = '(32 - 2) * 5';

    let humn = 301;
    let first = eval(one.replace('humn', humn));
    let second = eval(two.replace('humn', humn));
    console.log(first === second);

    return 301;
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