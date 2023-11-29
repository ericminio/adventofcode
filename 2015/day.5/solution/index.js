const double = require('./double.js');
const nooverlapping = require('./nooverlapping.js');
const repetition = require('./repetition.js');
const substrings = require('./substrings.js');
const vowels = require('./vowels.js');

module.exports = {
    solvepartone: (lines) =>
        lines.reduce(
            (total, line) =>
                total +
                (vowels(line) && substrings(line) && double(line) ? 1 : 0),
            0,
        ),
    solveparttwo: (lines) =>
        lines.reduce(
            (total, line) =>
                total + (nooverlapping(line) && repetition(line) ? 1 : 0),
            0,
        ),
};
