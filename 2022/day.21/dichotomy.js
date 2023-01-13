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

module.exports = { approach };