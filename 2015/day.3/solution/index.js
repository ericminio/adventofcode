const { visiting } = require('./visiting');

module.exports = {
    solvepartone: (input) => {
        const houses = visiting(input);
        return Object.keys(houses).length;
    },
    solveparttwo: () => '?',
};
