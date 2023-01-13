const compute = ({ cells, values }) => {

    let cell = cells[1];
    if (isNaN(cell.value)) {
        let name = cell.name;
        let formula = cell.formula;
        let needs = variables(formula);
        let available = true;
        needs.forEach(variable => {
            if (isNaN(values[variable])) {
                available = false;
            }
        });
        if (available) {
            let operation;
            needs.forEach(variable => {
                let pattern = new RegExp(variable, 'g');
                operation = formula.replace(pattern, values[variable]);
            });
            let value = eval(operation);
            values[name] =  value;
        }
    }
};

let pattern = /(.*)\s.\s(.*)/;
const variables = (formula) => pattern.exec(formula).splice(1);

const tryToCompute = ({ cell, values }) => {
    let name = cell.name;
    let formula = cell.formula;
    let needs = variables(formula);
    let available = true;
    needs.forEach(variable => {
        if (isNaN(values[variable])) {
            available = false;
        }
    });
    if (available) {
        let operation;
        needs.forEach(variable => {
            let pattern = new RegExp(variable, 'g');
            operation = formula.replace(pattern, values[variable]);
        });
        let value = eval(operation);
        values[name] =  value;
    }
};

module.exports = { compute };