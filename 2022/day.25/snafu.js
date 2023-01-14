const { powerDecomposition } = require('./power-decomposition.js');

const fromDecimalToSnafu = (number) => {
    let decomposition = powerDecomposition(5, number);

    return '1-0';
};

const fromSnafuToDecimal = (snafu) => {
    let decimal = 0;
    snafu.split('').forEach((digit, i) => {
        let value = snafuTable[digit];
        decimal += value * Math.pow(5, snafu.length - i - 1);
    });
    return decimal;
};

const snafuTable = {
    '0': 0,
    '1': 1,
    '2': 2,
    '=': -2,
    '-': -1,
};

module.exports = { fromSnafuToDecimal, fromDecimalToSnafu };