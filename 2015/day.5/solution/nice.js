const double = require('./double.js');
const substrings = require('./substrings.js');
const vowels = require('./vowels.js');

module.exports = (line) => vowels(line) && substrings(line) && double(line);
