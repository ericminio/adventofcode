const value = require('./value.js');

module.exports = {
    solvepartone: (lines) => {
        return lines.reduce((total, line) => total + value(line), 0);
    },
    solveparttwo: () => '?',
};
