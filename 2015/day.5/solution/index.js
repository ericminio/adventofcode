const nice = require('./nice.js');

module.exports = {
    solvepartone: (lines) =>
        lines.reduce((total, line) => total + (nice(line) ? 1 : 0), 0),
    solveparttwo: () => '?',
};
