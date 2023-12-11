import { sumall } from '../../../support/index.js';
import { count } from './counter.js';
import { joker } from './joker.js';
import { parse } from './parser.js';
import { sortTwo, sortTwoWithJoker } from './sorter.js';
import { type } from './typer.js';

export const solvepartone = (lines) => {
    const hands = parse(lines);
    const handsWithCounts = hands.map((hand) => ({
        ...hand,
        counts: count(hand.cards),
    }));
    const handsWithTypes = handsWithCounts.map((hand) => ({
        ...hand,
        type: type(hand.counts),
    }));
    handsWithTypes.sort((a, b) =>
        a.type !== b.type ? a.type - b.type : sortTwo(a.cards, b.cards),
    );

    const total = sumall(
        handsWithTypes.map((hand, index) => (index + 1) * hand.bid),
    );

    return total;
};

export const solveparttwo = (lines) => {
    const hands = parse(lines);
    const handsWithCounts = hands.map((hand) => ({
        ...hand,
        counts: count(hand.cards),
    }));
    const handsWithTypes = handsWithCounts.map((hand) => ({
        ...hand,
        type: joker(hand.counts),
    }));
    handsWithTypes.sort((a, b) =>
        a.type !== b.type
            ? a.type - b.type
            : sortTwoWithJoker(a.cards, b.cards),
    );
    const total = sumall(
        handsWithTypes.map((hand, index) => (index + 1) * hand.bid),
    );

    return total;
};
