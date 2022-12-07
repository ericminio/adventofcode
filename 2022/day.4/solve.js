const { total, lines, extractor, isInside, isOverlapping } = require('../support');

const pattern = /^(.*)-(.*),(.*)-(.*)$/;
const parse = data => data.map(value => parseInt(value));
const builder = (numbers) => ({
    one: { start: numbers[0], end: numbers[1] },
    two: { start: numbers[2], end: numbers[3] },
});
const pairs = (file) => lines(file).map(extractor(pattern)).map(parse).map(builder);

const isContainingPair = pair => isInside(pair.two, pair.one) || isInside(pair.one, pair.two);
const containing = file => pairs(file).map(isContainingPair);

const isOverlappingPair = pair => isOverlapping(pair.one, pair.two);
const overlapping = file => pairs(file).map(isOverlappingPair);

const solve1 = (file) => {
    return total(containing(file));
};
const solve2 = (file) => {
    return total(overlapping(file));
};

module.exports = { solve1, solve2 };