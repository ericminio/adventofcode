const firstDigitRegExp = /(\d)/;
const lastDigitRegExp = /.*(\d)/;

const firstDigit = (line) => firstDigitRegExp.exec(line)[1];
const lastDigit = (line) => lastDigitRegExp.exec(line)[1];

const value = (digit) => parseInt(digit);

module.exports = (line) =>
    10 * value(firstDigit(line)) + value(lastDigit(line));
