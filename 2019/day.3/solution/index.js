const { manhattan } = require('../../../support');
const intersections = require('./intersections.js');

module.exports = {
    solvepartone: (lines) => {
        const candidates = intersections(lines);
        const origin = { x: 0, y: 0 };
        candidates.sort((a, b) => manhattan(a, origin) - manhattan(b, origin));
        return manhattan(candidates[0], origin);
    },
    solveparttwo: () => '?',
};
