const pattern = /^(.*) is not defined$/;

const expand = (monkey, formulas) => {
    let formula = formulas[monkey];

    let done = false;
    while (!done) {
        try {
            eval(formula);
            done = true;
        }
        catch (error) {
            let [ variable ] = pattern.exec(error.message).splice(1);
            let next = formulas[variable];
            if (variable === 'humn') {
                next = '42';
            }
            formula = formula.replace(new RegExp(variable, 'g'), `(${next})`);
        }
    }

    return formula.replace(/\(42\)/g, 'humn');
};

module.exports = { expand };