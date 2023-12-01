const firstDigit = require('./digit.js');
const lastDigit = require('./last-digit.js')(firstDigit);
const extract = require('./extract.js');

const value = (number) => parseInt(number);

module.exports = (line) =>
    10 * value(extract(firstDigit, line)) + value(extract(lastDigit, line));
