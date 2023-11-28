module.exports = {
    solvepartone: (masses) =>
        masses.reduce((total, mass) => total + Math.floor(mass / 3) - 2, 0),
    solveparttwo: () => '?',
};
