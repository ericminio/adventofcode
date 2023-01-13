const compute = ({ cells, values }, probe) => {

    while (isNaN(values[probe])) {
        cells.forEach(cell => {
            if (isNaN(cell.value)) {
                tryToCompute({ cell, values });
            }
        });
    }
};

let pattern = /(.*)\s.\s(.*)/;
const variables = (formula) => pattern.exec(formula).splice(1);

const tryToCompute = ({ cell, values }) => {
    let formula = cell.formula;
    let needs = variables(formula);
    let available = true;
    needs.forEach(variable => {
        if (isNaN(values[variable])) {
            available = false;
        }
    });
    if (available) {
        let operation = formula;
        needs.forEach(variable => {
            let pattern = new RegExp(variable, 'g');
            operation = operation.replace(pattern, values[variable]);
        });
        let value = eval(operation);
        values[cell.name] =  value;
    }
};

module.exports = { compute };