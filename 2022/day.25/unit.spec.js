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
    return 2022;
};