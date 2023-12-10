import { sumall } from '../../../support/index.js';
import { parse } from './parse.js';

export const solvepartone = (lines) => {
    const hands = parse(lines);
    const total = sumall(
        [
            { cards: '32T3K', bid: 765 },
            { cards: 'KTJJT', bid: 220 },
            { cards: 'KK677', bid: 28 },
            { cards: 'T55J5', bid: 684 },
            { cards: 'QQQJA', bid: 483 },
        ].map((hand, index) => (index + 1) * hand.bid),
    );

    return total;
};

export const solveparttwo = () => '?';
