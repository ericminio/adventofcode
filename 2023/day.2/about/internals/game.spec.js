import { expect } from 'chai';

import { game } from '../../solution/game.js';

describe('game parser', () => {
    it('can parse a game with 1 draw of 1 red', () => {
        const line = 'Game 1: 2 red';

        expect(game(line)).to.deep.equal({
            id: 1,
            draws: [{ red: 2, green: 0, blue: 0 }],
        });
    });

    it('can parse a game with 1 draw of 1 green', () => {
        const line = 'Game 1: 2 green';

        expect(game(line)).to.deep.equal({
            id: 1,
            draws: [{ red: 0, green: 2, blue: 0 }],
        });
    });

    it('can parse a game with 1 draw of 1 blue', () => {
        const line = 'Game 1: 2 blue';

        expect(game(line)).to.deep.equal({
            id: 1,
            draws: [{ red: 0, green: 0, blue: 2 }],
        });
    });

    it('can parse a bigger game', () => {
        const line =
            'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue';

        expect(game(line)).to.deep.equal({
            id: 2,
            draws: [
                { red: 0, green: 2, blue: 1 },
                { red: 1, green: 3, blue: 4 },
                { red: 0, green: 1, blue: 1 },
            ],
        });
    });
});
