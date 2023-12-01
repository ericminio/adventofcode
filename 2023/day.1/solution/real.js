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

const firstDigitRegExp = new RegExp('(\\d|' + numbers.join('|') + ')');
const lastDigitRegExp = new RegExp('.*(\\d|' + numbers.join('|') + ')');

const firstDigit = (line) => firstDigitRegExp.exec(line)[1];
const lastDigit = (line) => lastDigitRegExp.exec(line)[1];

const value = (extracted) => {
    const index = numbers.indexOf(extracted);
    return index === -1 ? parseInt(extracted) : index + 1;
};

module.exports = (line) => {
    return 10 * value(firstDigit(line)) + value(lastDigit(line));
};
