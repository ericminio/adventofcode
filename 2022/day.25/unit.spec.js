const { expect } = require('chai');

describe.only('unit transformation', () => {

    it('works for 1', () => {
        expect(toSNAFU(1)).to.equal('1');
    });

    it('works for 1=11-2', () => {
        expect(toDecimal('1=11-2')).to.equal(2022);
    });
});

const toSNAFU = (number) => {
    let snafu = [];

    let digit = 1;
    let focus = number % Math.pow(5, digit);

    snafu.unshift('1');

    return snafu.join('');
};

const toDecimal = (snafu) => {
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