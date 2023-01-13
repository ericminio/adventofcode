const compute = ({ cells, values }) => {

    let name = cells[1].name;
    let formula = cells[1].formula;
    let needs = variables(formula);
    let operation;
    needs.forEach(variable => {
        let pattern = new RegExp(variable, 'g');
        operation = formula.replace(pattern, values[variable]);
    });
    let value = eval(operation);

    values[name] =  value;
};

let pattern = /(.*)\s.\s(.*)/;
const variables = (formula) => {
    let data = pattern.exec(formula).splice(1);
    return data;
};

module.exports = { compute };