import { expect } from 'chai';

import { isPossible } from '../../solution/isPossible.js';

describe('game inspection againt a bag', () => {
    it('is a match when draw matches bag capacity', () => {
        const game = {
            draws: [{ red: 1, green: 2, blue: 3 }],
        };
        const bag = { red: 1, green: 2, blue: 3 };

        expect(isPossible(game, bag)).to.equal(true);
    });

    it('is a match when all draws match bag capacity', () => {
        const game = {
            draws: [
                { red: 1, green: 2, blue: 3 },
                { red: 1, green: 1, blue: 1 },
            ],
        };
        const bag = { red: 1, green: 2, blue: 3 };

        expect(isPossible(game, bag)).to.equal(true);
    });

    it('is not a match when one draw does not match bag capacity', () => {
        const game = {
            draws: [
                { red: 1, green: 1, blue: 1 },
                { red: 2, green: 2, blue: 2 },
            ],
        };
        const bag = { red: 1, green: 1, blue: 1 };

        expect(isPossible(game, bag)).to.equal(false);
    });
});
