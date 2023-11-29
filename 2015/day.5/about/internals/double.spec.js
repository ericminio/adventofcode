const { expect } = require('chai');
const double = require('../../solution/double.js');

describe('double letter matchers', () => {
    it('is happy with xx', () => {
        expect(double('xx')).to.equal(true);
    });

    it('is happy with abcdde', () => {
        expect(double('abcdde')).to.equal(true);
    });

    it('is happy with aabbccdd', () => {
        expect(double('aabbccdd')).to.equal(true);
    });

    it('is not happy with jchzalrnumimnmhp', () => {
        expect(double('jchzalrnumimnmhp')).to.equal(false);
    });
});
