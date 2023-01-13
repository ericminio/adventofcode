const { expect } = require('chai');
const { approach } = require('./dichotomy');
const hug = ({ target, affine, start, step }) => {
    let x = approach({
        target,
        affine,
        start,
        jump: x => x * step
    });
    let increment = x;
    while (increment > 1) {
        x = approach({
            target,
            affine,
            start: x,
            jump: x => x + increment
        });
        increment /= step;
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

    it('can be a combination of both', () => {
        let x = hug({
            target: 5321,
            affine: x => x,
            start: 1,
            step: 10
        });

        expect(x).to.equal(5320);
    });
});