const expand = (monkey, formulas) => {
    let formula = formulas[monkey];

    try {
        eval(formula);
    }
    catch (error) {
        console.log(error.message);
    }

    return '3 * 3';
};

module.exports = { expand };