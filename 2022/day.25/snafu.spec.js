const { expect } = require('chai');
const { fromDecimalToSnafu, fromSnafuToDecimal } = require('./snafu');

describe('from decimal to snafu', () => {

    it('works for 66', () => {
        expect(fromDecimalToSnafu(66)).to.equal('1==1');
    });

    it('works for 2022', () => {
        expect(fromDecimalToSnafu(2022)).to.equal('1=11-2');
    });

    it('works for 314159265', () => {
        expect(fromDecimalToSnafu(314159265)).to.equal('1121-1110-1=0');
    });
});

describe('from snafu to decimal', () => {

    it('works for 1=11-2', () => {
        expect(fromSnafuToDecimal('1=11-2')).to.equal(2022);
    });

    it('works for 1121-1110-1=0', () => {
        expect(fromSnafuToDecimal('1121-1110-1=0')).to.equal(314159265);
    });
});