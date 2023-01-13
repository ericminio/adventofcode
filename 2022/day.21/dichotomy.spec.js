const { expect } = require('chai');

describe.only('dichotomy', () => {

    it('can be geometric', () => {
        const target = 5321;
        const affine = x => x;
        const geometric = (x, jump) => x * jump;

        let x = 1;
        let jump = 10;
        let around = false;
        while (! around) {
            let current = affine(x);
            let next = affine(geometric(x, jump));
            around = (current - target) * (next - target) < 0;
            if (! around) {
                x = geometric(x, jump);
            }
        }

        expect(x).to.equal(1000);
    });
});