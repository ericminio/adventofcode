const { powerDecomposition } = require('./power-decomposition.js');

const fromDecimalToSnafu = (number) => {
    let decomposition = powerDecomposition(5, number);
    console.log(decomposition);
    let transposed = decomposition.slice();
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
    }
    let i = 0;
    let value = transposed[i];
    if (value == 3) {
        transposed[i] = -2;
        transposed.unshift(1);
    }
    if (value == 4) {
        transposed[i] = -1;
        transposed.unshift(1);
    }
    console.log(transposed);

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