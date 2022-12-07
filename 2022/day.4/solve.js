const { total, lines, extractor, isInside, isOverlapping } = require('../support');

const pattern = /^(.*)-(.*),(.*)-(.*)$/;
const parse = data => data.map(value => parseInt(value));
const builder = (numbers) => ({
    one: { start: numbers[0], end: numbers[1] },
    two: { start: numbers[2], end: numbers[3] },
});
const pairs = (file) => lines(file).map(extractor(pattern)).map(parse).map(builder);

const isContainingPair = pair => isInside(pair.two, pair.one) || isInside(pair.one, pair.two);
const isOverlappingPair = pair => isOverlapping(pair.one, pair.two);

const solve1 = (file) => {
    return total(pairs(file).map(isContainingPair));
};
const solve2 = (file) => {
    return total(pairs(file).map(isOverlappingPair));
};

module.exports = { solve1, solve2 };