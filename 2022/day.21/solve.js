const { lines } = require('../support/index.js');
const { compute } = require('./compute.js');
const { expand } = require('./expand.js');
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
    let cells = cellDefinitions.map(parseCell);
    let formulas = {};
    cells.forEach(cell => {
        formulas[cell.name] = cell.formula;
    });
    let root = cellDefinitions.find(line => line.startsWith('root'));
    let pattern = /root:\s(.*)\s.\s(.*)/;
    let [ monkey1, monkey2 ] = pattern.exec(root).splice(1);

    let one = expand(monkey1, formulas);
    const affine = (humn) => eval(one.replace('humn', humn));
    console.log(one);

    let two = expand(monkey2, formulas);
    let target = eval(two.replace('humn', 0));
    console.log('target', target);

    let humn = 0;
    let increment = 1000000000;
    let around = false;
    while (! around) {
        let first = affine(humn);
        let second = affine(humn + increment);
        around = (first - target) * (second - target) < 0;
        if (! around) {
            humn += increment;
        }
    }
    console.log(humn);


    // let same = false;
    // do {
    //     humn ++;
    //     let first = eval(one.replace('humn', humn));
    //     same = first === second;
    // } while (! same);

    return 301;
};

module.exports = { solve1, solve2 };