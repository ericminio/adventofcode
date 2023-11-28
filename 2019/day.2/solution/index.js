const Program = require('./program');

module.exports = {
    solvepartone: (input) => {
        const program = new Program(input);
        program.values[1] = 12;
        program.values[2] = 2;
        const values = program.run();
        return values[0];
    },
    solveparttwo: (input) => {
        const stop = 19690720;
        for (let noun = 0; noun < 99; noun++) {
            for (let verb = 0; verb < 99; verb++) {
                const program = new Program(input);
                program.values[1] = noun;
                program.values[2] = verb;
                const values = program.run();
                if (values[0] === stop) {
                    return 100 * noun + verb;
                }
            }
        }
        throw new Error('not found');
    },
};
