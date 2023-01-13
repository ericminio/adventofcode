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
        let x = approach({
            target: 5321,
            affine: x => x,
            start: 1,
            jump: x => x * 10
        });

        expect(x).to.equal(1000);
    });

    it('can be arythmetic', () => {
        let x = approach({
            target: 5321,
            affine: x => x,
            start: 1000,
            jump: x => x + 1000
        });

        expect(x).to.equal(5000);
    });
});