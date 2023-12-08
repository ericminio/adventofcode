import { expect } from 'chai';

import { solvepartone } from '../solution/index.js';

describe('2023.6 puzzles', () => {
    describe('What do you get if you multiply number of ways you can beat the record?', () => {
        it('is solved', () => {
            expect(
                solvepartone([
                    { time: 46, record: 214 },
                    { time: 80, record: 1177 },
                    { time: 78, record: 1402 },
                    { time: 66, record: 1024 },
                ]),
            ).to.equal(512295);
        });
    });

    describe('How many ways can you beat the record in this one much longer race?', () => {
        it('is solved', () => {
            expect(
                solvepartone([{ time: 46807866, record: 214117714021024 }]),
            ).to.equal(36530883);
        });
    });

    it('has an example for part 1', () => {
        expect(
            solvepartone([
                { time: 7, record: 9 },
                { time: 15, record: 40 },
                { time: 30, record: 200 },
            ]),
        ).to.deep.equal(288);
    });

    it('has an example for part 2', () => {
        expect(solvepartone([{ time: 71530, record: 940200 }])).to.deep.equal(
            71503,
        );
    });
});
