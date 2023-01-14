const { expect } = require('chai');
const { fromDecimalToSnafu, fromSnafuToDecimal } = require('./snafu');

describe.only('snafu transformation', () => {

    it('works for 1', () => {
        expect(fromDecimalToSnafu(1)).to.equal('1');
    });

    it('works for 1=11-2', () => {
        expect(fromSnafuToDecimal('1=11-2')).to.equal(2022);
    });

    it('works for 1=11-2', () => {
        expect(fromSnafuToDecimal('1121-1110-1=0')).to.equal(314159265);
    });
});

describe.only('power decomposition', () => {

    it('works as expected', () => {
        expect(powDecomposition(5, 33)).to.deep.equal([ 1, 1, 3 ]);
    });
});

const powDecomposition = (pow, number) => {
    let max = 1;
    while (Math.floor(number / max) > 1) {
        max ++;
    }

    return [ 1, 1, 3 ];
};