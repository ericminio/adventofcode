const fromDecimalToSnafu = (number) => {
    let snafu = [];
    let focus;

    focus = number % 5;
    if (focus == 1) {
        snafu.unshift('1');
        number = number - focus;
    }

    if (number > 1) {
        focus = Math.floor(number / 5);
        if (focus == 1) {
            snafu.unshift('1');
            number = number - focus * 5;
        }
    }

    console.log(number);

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