const { manhattan } = require("../../../support");

module.exports = {
    solvepartone: (lines) => {
        const origin = { x: 0, y: 0 };
        const candidates = [
            { x: 15, y: 15 },
            { x: 42, y: 42 },
        ];
        candidates.sort((a, b) => manhattan(a, origin) - manhattan(b, origin));
        return manhattan(candidates[0], origin);
}, solveparttwo: () => '?' };
