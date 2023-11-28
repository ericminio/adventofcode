const Elf = require('./elf');

module.exports = {
    solvepartone: (input) => {
        const stufur = new Elf();
        return stufur.totalSurfaceForDimensions(input);
    },
    solveparttwo: () => '?',
};
