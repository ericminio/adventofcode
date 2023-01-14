const { expect } = require('chai');
const { fromDecimalToSnafu, fromSnafuToDecimal } = require('./snafu');

describe.only('from decimal to snafu', () => {

    it('works for 66', () => {
        expect(fromDecimalToSnafu(66)).to.equal('1-0');
    });
});

describe.only('from snafu to decimal', () => {

    it('works for 1=11-2', () => {
        expect(fromSnafuToDecimal('1=11-2')).to.equal(2022);
    });

    it('works for 1=11-2', () => {
        expect(fromSnafuToDecimal('1121-1110-1=0')).to.equal(314159265);
    });
});