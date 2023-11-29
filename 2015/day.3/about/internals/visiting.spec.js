const { expect } = require('chai');

const { visiting } = require('../../solution/visiting');

describe('visiting', () => {
    it('works for one house east', () => {
        const input = '>';
        const houses = visiting(input);

        expect(Object.keys(houses).length).to.equal(2);
    });

    it('works for ^>v<', () => {
        const houses = visiting('^>v<');

        expect(Object.keys(houses).length).to.equal(4);
    });

    it('works for ^v^v^v^v^v', () => {
        const houses = visiting('^v^v^v^v^v');

        expect(Object.keys(houses).length).to.equal(2);
    });
});
