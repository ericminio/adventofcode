const { powerDecomposition } = require('../../lib/power-decomposition.js');

const fromDecimalToSnafu = (number) => {
    let decomposition = powerDecomposition(5, number);
    let transposed = decomposition.slice();
    transposed.unshift(0);
    for (let i = transposed.length - 1; i > 0; i--) {
        let value = transposed[i];
        if (value == 3) {
            transposed[i] = -2;
            transposed[i - 1] = transposed[i - 1] + 1;
        }
        if (value == 4) {
            transposed[i] = -1;
            transposed[i - 1] = transposed[i - 1] + 1;
        }
        if (value == 5) {
            transposed[i] = 0;
            transposed[i - 1] = transposed[i - 1] + 1;
        }
    }
    if (transposed[0] === 0) {
        transposed.shift();
    }

    return transposed.map(snafuSymbol).join('');
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
const snafuSymbol = (decimal) => {
    return Object.keys(snafuTable).find(key => snafuTable[key] === decimal);
};

module.exports = { fromSnafuToDecimal, fromDecimalToSnafu };