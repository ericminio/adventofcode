const firstDigit = require('./digit-or-letters.js');
const lastDigit = require('./last-digit.js')(firstDigit);
const extract = require('./extract.js');
const numbers = require('./numbers');

const value = (number) => {
    const index = numbers.indexOf(number);
    return index === -1 ? parseInt(number) : index + 1;
};

module.exports = (line) =>
    10 * value(extract(firstDigit, line)) + value(extract(lastDigit, line));
