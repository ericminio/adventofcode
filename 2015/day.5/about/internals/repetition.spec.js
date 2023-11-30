const { expect } = require('chai');
const repetition = require('../../solution/repetition.js');

describe('repetition matchers', () => {
    it('is happy with efe', () => {
        expect(repetition('efe')).to.equal(true);
    });

    it('is not happy with ee', () => {
        expect(repetition('ee')).to.equal(false);
    });

    it('is happy with qjhvhtzxzqqjkmpb', () => {
        expect(repetition('qjhvhtzxzqqjkmpb')).to.equal(true);
    });

    it('is happy with xxyxx', () => {
        expect(repetition('xxyxx')).to.equal(true);
    });

    it('is not happy with uurcxstgmygtbstg', () => {
        expect(repetition('uurcxstgmygtbstg')).to.equal(false);
    });
});
