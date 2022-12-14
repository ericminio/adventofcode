const { add, lines, extractor, isInside, isOverlapping } = require('../support');

const pattern = /^(.*)-(.*),(.*)-(.*)$/;
const builder = (data) => ({
    one: { start: parseInt(data[0]), end: parseInt(data[1]) },
    two: { start: parseInt(data[2]), end: parseInt(data[3]) },
});
const pairs = (file) => lines(file).map(extractor(pattern)).map(builder);

const isContainingPair = pair => isInside(pair.two, pair.one) || isInside(pair.one, pair.two);
const isOverlappingPair = pair => isOverlapping(pair.one, pair.two);

const solve1 = (file) => {
    return pairs(file).map(isContainingPair).reduce(add);
};
const solve2 = (file) => {
    return pairs(file).map(isOverlappingPair).reduce(add);
};

module.exports = { solve1, solve2 };