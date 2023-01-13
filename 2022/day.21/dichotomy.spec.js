const { expect } = require('chai');
const { approach } = require('./dichotomy');

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
        let target = 5321;
        let affine = x => x;
        let x = approach({
            target,
            affine,
            start: 1,
            jump: x => x * 10
        });
        let step = x;
        while (step > 1) {
            x = approach({
                target,
                affine,
                start: x,
                jump: x => x + step
            });
            step /= 10;
        }

        // x = 5320;
        expect(x).to.equal(5320);
    });
});