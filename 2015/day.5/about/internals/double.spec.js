const { expect } = require('chai');
const double = require('../../solution/double.js');

describe('double letter matchers', () => {
    it('is happy with xx', () => {
        expect(double('xx')).to.equal(true);
    });
});
