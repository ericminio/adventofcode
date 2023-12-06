import { extractor, sumall } from '../../../support/index.js';

const pattern = /Card\s+(\d+):\s(.*)\s\|\s(.*)/;
export const nonEmpty = (s) => s.length > 0;
export const toInt = (s) => parseInt(s);
export const parse = (cards) => cards.split(' ').filter(nonEmpty).map(toInt);

export const solvepartone = (lines) =>
    sumall(
        lines
            .map((line) => {
                const [cardId, winning, played] = extractor(pattern)(line);
                return {
                    cardId,
                    winning: parse(winning),
                    played: parse(played),
                };
            })
            .map((game) => game.played.filter((c) => game.winning.includes(c)))
            .filter(nonEmpty)
            .map((cards) => cards.length)
            .map((size) => Math.pow(2, size - 1)),
    );

export const solveparttwo = (lines) => {
    const cards = lines
        .map((line) => {
            const [cardId, winning, played] = extractor(pattern)(line);
            return {
                cardId,
                winning: parse(winning),
                played: parse(played),
            };
        })
        .map((game) => ({
            id: game.cardId,
            winningNumbersCount: game.played.filter((c) =>
                game.winning.includes(c),
            ).length,
            count: 1,
        }));

    for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < i + 1 + cards[i].winningNumbersCount; j++) {
            cards[j].count = cards[j].count + cards[i].count;
        }
    }

    return sumall(cards.map((c) => c.count));
};
