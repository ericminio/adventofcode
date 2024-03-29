const { powerDecomposition } = require('../../lib/power-decomposition.js');
const base = 5;

const fromDecimalToSnafu = (number) => {
    let transposed = powerDecomposition(base, number);
    transposed.unshift(0);
    for (let i = transposed.length - 1; i > 0; i--) {
        let value = transposed[i];
        if ([ 3, 4, 5 ].includes(value)) {
            transposed[i] = value - 5;
            transposed[i - 1] ++;
        }
    }
    if (transposed[0] === 0) {
        transposed.shift();
    }
    return transposed.map(snafuSymbol).join('');
};

const fromSnafuToDecimal = (snafu) => {
    return snafu
        .split('')
        .reduce((value, code, index) => value + snafuTable[code] * Math.pow(base, snafu.length - index - 1), 0);
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