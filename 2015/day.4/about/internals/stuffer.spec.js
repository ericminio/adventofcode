const { expect } = require('chai');
const stuffer = require('../../solution/stuffer.js');
const start = require('../../solution/start.js');

describe.skip('stuffer', () => {
    it('knows what to look for', () => {
        expect(start('abcdef', 609043)).to.equal('00000');
    });

    it('can stuff abcdef', () => {
        expect(stuffer('abcdef')).to.equal(609043);
    });

    it('can stuff pqrstuv', () => {
        expect(stuffer('pqrstuv')).to.equal(1048970);
    });
});
