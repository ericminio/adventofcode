const { expect } = require('chai');

describe.only('geometric dichotomy', () => {

    it('assumes that the solution is a positive integer', () => {
        const target = 5000;
        const affine = x => x;
        const geometric = jump => jump * 10;

        let x = 1;
        let around = false;
        while (! around) {
            let current = affine(x);
            let next = affine(geometric(x));
            around = (current - target) * (next - target) < 0;
            if (! around) {
                x = geometric(x);
            }
        }

        expect(x).to.equal(1000);
    });
});