const { expect } = require('chai');
const approach = ({ target, affine, jump }) => {
    let x = 1;
    let step = 10;
    let around = false;
    while (! around) {
        let current = affine(x);
        let next = affine(jump(x, step));
        around = (current - target) * (next - target) < 0;
        if (! around) {
            x = jump(x, step);
        }
    }
    return x;
};

describe.only('dichotomy', () => {

    it('can be geometric', () => {
        const target = 5321;
        const affine = x => x;
        const jump = (x, jump) => x * jump;

        let x = 1;
        let step = 10;
        let around = false;
        while (! around) {
            let current = affine(x);
            let next = affine(jump(x, step));
            around = (current - target) * (next - target) < 0;
            if (! around) {
                x = jump(x, step);
            }
        }

        expect(x).to.equal(1000);
    });

    it('can be arythmetic', () => {
        const target = 5321;
        const affine = x => x;
        const jump = (x, jump) => x + jump;

        let x = 1000;
        let step = 1000;
        let around = false;
        while (! around) {
            let current = affine(x);
            let next = affine(jump(x, step));
            around = (current - target) * (next - target) < 0;
            if (! around) {
                x = jump(x, step);
            }
        }

        expect(x).to.equal(5000);
    });
});