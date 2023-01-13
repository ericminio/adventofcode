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
    return {
        name: data[0],
        formula: data[1],
        value,
    };
};

module.exports = { parseCell };