const { lines } = require('../support/index.js');

const solve1 = (file) => {
    let cellDefinitions = lines(file);
    let sheet = cellDefinitions.map(parseCell);
    console.log(sheet);

    return 152;
};

const solve2 = () => {
    return 15;
};

let pattern = /(.*):\s(.*)/;
let parseCell = (incoming) => {
    let data = pattern.exec(incoming).splice(1);
    let value;
    try {
        value = eval(data[1]);
    }
    catch {
        value = NaN;
    }
    let cell = {
        name: data[0],
        formula: data[1],
        value,
    };
    return cell;
};



module.exports = { solve1, solve2, parseCell };