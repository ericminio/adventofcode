const real = require('./real-value.js');
const value = require('./value.js');

module.exports = {
    solvepartone: (lines) => {
        return lines.reduce((total, line) => total + value(line), 0);
    },
    solveparttwo: (lines) => {
        return lines.reduce((total, line) => total + real(line), 0);
    },
};
