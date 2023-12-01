import { expect } from 'chai';

import { Program } from '../solution/program.js';

describe('Program', () => {
    it('can add', () => {
        const program = new Program('1,9,10,3,2,3,11,0,99,30,40,50');
        const values = program.runAtCursor();

        expect(values).to.deep.equal([
            1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50,
        ]);
    });

    it('can multiply', () => {
        const program = new Program('1,9,10,3,2,3,11,0,99,30,40,50');
        program.runAtCursor();
        program.cursor += 4;
        const values = program.runAtCursor();

        expect(values).to.deep.equal([
            3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50,
        ]);
    });

    it('can run', () => {
        const program = new Program('1,9,10,3,2,3,11,0,99,30,40,50');
        const values = program.run();

        expect(values).to.deep.equal([
            3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50,
        ]);
    });
});
