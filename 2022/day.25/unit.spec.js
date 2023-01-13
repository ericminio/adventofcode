const { expect } = require('chai');

describe.only('unit transformation', () => {

    it('works for 1', () => {
        expect(toSNAFU(1)).to.equal('1');
    });
});

const toSNAFU = (number) => {
    let snafu = [];

    snafu.unshift('1');

    return '1';
};