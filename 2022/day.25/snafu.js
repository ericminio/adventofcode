const fromDecimalToSnafu = (number) => {
    let snafu = [];

    let digit = 1;
    let focus = number % Math.pow(5, digit);

    snafu.unshift('1');

    return snafu.join('');
};

const fromSnafuToDecimal = (snafu) => {
    let decimal = 0;
    const digits = snafu.split('');
    for (let i = 0; i < digits.length; i++) {
        let digit = digits[i];
        let value = snafuTable[digit];
        decimal += value * Math.pow(5, digits.length - i - 1);
    }
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