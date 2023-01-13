const { expect } = require('chai');
const approach = ({ target, affine, start, jump }) => {
    let x = start;
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
        const jump = x => x * 10;
        let x = approach({ target, affine, start: 1, jump });

        expect(x).to.equal(1000);
    });

    it('can be arythmetic', () => {
        const target = 5321;
        const affine = x => x;
        const jump = x => x + 1000;
        let x = 1000;

        let around = false;
        while (! around) {
            let current = affine(x);
            let next = affine(jump(x));
            around = (current - target) * (next - target) < 0;
            if (! around) {
                x = jump(x);
            }
        }

        expect(x).to.equal(5000);
    });
});