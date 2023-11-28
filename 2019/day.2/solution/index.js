const Program = require('./program');

module.exports = {
    solvepartone: (input) => {
        const program = new Program(input);
        program.values[1] = 12;
        program.values[2] = 2;
        const values = program.run();
        return values[0];
    },
    solveparttwo: () => '?',
};
