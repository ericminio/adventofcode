import { expect } from 'chai';

import { sortTwo, sortTwoWithJoker } from '../../solution/sorter.js';

describe('sorter', () => {
    it('knows when a number card is weaker', () => {
        expect(sortTwo('2', 'A')).to.equal(-1);
    });
    it('knows when a number card is stronger', () => {
        expect(sortTwo('A', '2')).to.equal(1);
    });

    it('knows when 2 cards are equal', () => {
        expect(sortTwo('2', '2')).to.equal(0);
    });

    it('can go down 2 steps to decide', () => {
        expect(sortTwo('KT', 'KK')).to.equal(-1);
    });

    it('can go down 3 steps to decide', () => {
        expect(sortTwo('AA2', 'AAA')).to.equal(-1);
    });

    it('can be used to sort a set of hands', () => {
        const hands = [
            { cards: '32T3K', type: 2 },
            { cards: 'T55J5', type: 4 },
            { cards: 'KK677', type: 3 },
            { cards: 'KTJJT', type: 3 },
            { cards: 'QQQJA', type: 4 },
        ];
        hands.sort((a, b) =>
            a.type !== b.type ? a.type - b.type : sortTwo(a.cards, b.cards),
        );

        expect(hands).to.deep.equal([
            { cards: '32T3K', type: 2 },
            { cards: 'KTJJT', type: 3 },
            { cards: 'KK677', type: 3 },
            { cards: 'T55J5', type: 4 },
            { cards: 'QQQJA', type: 4 },
        ]);
    });

    it('has the Jack between Q and T', () => {
        expect(sortTwo('J', 'Q')).to.equal(-1);
        expect(sortTwo('J', 'T')).to.equal(1);
    });

    it('has the Joker as last', () => {
        expect(sortTwoWithJoker('J', '2')).to.equal(-1);
    });
});
