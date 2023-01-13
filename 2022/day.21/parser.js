let cellPattern = /(.*):\s(.*)/;
const formulaPattern = /(.*)\s.\s(.*)/;

let parseCell = (incoming) => {
    let data = cellPattern.exec(incoming).splice(1);
    let value;
    try {
        value = eval(data[1]);
    }
    catch {
        value = NaN;
    }
    return {
        name: data[0],
        formula: data[1],
        value,
    };
};

module.exports = { parseCell, formulaPattern };