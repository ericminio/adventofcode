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

module.exports = { approach, hug };