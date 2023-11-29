module.exports = (input) => {
    let one = '';
    let two = '';

    input.split('').forEach((move, index) => {
        if (index % 2 == 0) {
            one += move;
        } else {
            two += move;
        }
    });

    return [one, two];
};
