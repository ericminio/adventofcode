const substrings = require('./substrings.js');
const vowels = require('./vowels.js');

module.exports = (line) => vowels(line) && substrings(line);
