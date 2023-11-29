const { expect } = require('chai');
const repetition = require('../../solution/repetition.js');

describe('repetition matchers', () => {
    it('is happy with efe', () => {
        expect(repetition('efe')).to.equal(true);
    });
});
