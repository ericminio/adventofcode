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

const firstDigit = new RegExp('(\\d|' + numbers.join('|') + ')');
const lastDigit = new RegExp('.*(\\d|' + numbers.join('|') + ')');

module.exports = (line) => {
    const first = firstDigit.exec(line)[1];
    const index = numbers.indexOf(first);
    let value = 10 * (index === -1 ? parseInt(first) : index + 1);

    const last = lastDigit.exec(line)[1];
    const lastIndex = numbers.indexOf(last);

    value += lastIndex === -1 ? parseInt(last) : lastIndex + 1;

    return value;
};
