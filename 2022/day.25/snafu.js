const fromDecimalToSnafu = (number) => {
    let snafu = [];

    let digit = 1;
    let focus = number % Math.pow(5, digit);

    if (focus == 1) {
        snafu.unshift('1');
    }

    return snafu.join('');
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