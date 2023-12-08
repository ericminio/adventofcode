import { sumall } from '../../../support/index.js';

export const solvepartone = () => {
    const hands = [
        { cards: '32T3K', bid: 765 },
        { cards: 'KTJJT', bid: 220 },
        { cards: 'KK677', bid: 28 },
        { cards: 'T55J5', bid: 684 },
        { cards: 'QQQJA', bid: 483 },
    ];
    const total = sumall(hands.map((hand, index) => (index + 1) * hand.bid));

    return total;
};

export const solveparttwo = () => '?';
