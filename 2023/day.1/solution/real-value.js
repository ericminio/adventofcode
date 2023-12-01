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
const lastDigitRegExp = new RegExp('.*' + firstDigitRegExp.source);

const firstDigit = (line) => firstDigitRegExp.exec(line)[1];
const lastDigit = (line) => lastDigitRegExp.exec(line)[1];

const value = (digit) => {
    const index = numbers.indexOf(digit);
    return index === -1 ? parseInt(digit) : index + 1;
};

module.exports = (line) =>
    10 * value(firstDigit(line)) + value(lastDigit(line));
