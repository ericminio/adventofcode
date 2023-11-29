const paths = require('./paths');
const { visiting } = require('./visiting');

module.exports = {
    solvepartone: (input) => {
        const houses = visiting(input);
        return Object.keys(houses).length;
    },
    solveparttwo: (input) => {
        const inputs = paths(input);
        const firstHouses = visiting(inputs[0]);
        const secondHouses = visiting(inputs[1]);
        const houses = { ...firstHouses, ...secondHouses };
        return Object.keys(houses).length;
    },
};
