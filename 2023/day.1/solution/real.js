const numbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];

module.exports = (line) => {
    const first = /(\d|one|two|three|four|five|six|seven|eight|nine)/.exec(
        line,
    )[1];
    const index = numbers.indexOf(first);
    let value = 10 * (index === -1 ? parseInt(first) : index + 1);

    const last = /.*(\d|one|two|three|four|five|six|seven|eight|nine)/.exec(
        line,
    )[1];
    const lastIndex = numbers.indexOf(last);

    value += lastIndex === -1 ? parseInt(last) : lastIndex + 1;

    return value;
};
