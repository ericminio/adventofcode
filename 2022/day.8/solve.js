const { lines, orderDescending, sum } = require('../support');

const parse = (lines) => {
    lines.width = lines[0].length;
    lines.height = lines.length;

    return lines;
};
const treeAt = (x, y, forest) => ({ x, y, height: parseInt(forest[x][y]) });
const neighbour = (steps, direction, tree, forest) => {
    let x = tree.x + steps * direction.dx;
    let y = tree.y + steps * direction.dy;
    if (forest[x] !== undefined && forest[x][y]) {
        return treeAt(x, y, forest);
    }
    return undefined;
};
const above = { dx: -1, dy: 0 };
const below = { dx: 1, dy: 0 };
const left = { dx: 0, dy: -1 };
const right = { dx: 0, dy: 1 };
const neighbours = (direction, tree, forest) => {
    let trees = [];
    let steps = 1;
    let candidate = neighbour(steps, direction, tree, forest);
    while (candidate !== undefined) {
        trees.push(candidate);
        steps++;
        candidate = neighbour(steps, direction, tree, forest);
    }
    return trees;
};
const isVisibleFrom = (direction, tree, forest) => {
    return !neighbours(direction, tree, forest)
        .map(candidate => tree.height > candidate.height)
        .some(visible => visible === false);
};
const viewingDistance = (direction, tree, forest) => {
    let stop = false;
    return sum(
        neighbours(direction, tree, forest)
            .map(candidate => {
                if (stop) {
                    return false;
                }
                if (tree.height <= candidate.height) {
                    stop = true;
                    return true;
                }
                return true;
            }));
};

const isVisible = (tree, forest) => [above, right, below, left]
    .reduce((visible, direction) => visible || isVisibleFrom(direction, tree, forest), false);

const scenicScore = (tree, forest) => [above, right, below, left]
    .reduce((score, direction) => score * viewingDistance(direction, tree, forest), 1);

const perimeter = (forest) => 2 * forest.height + 2 * (forest.width - 2);

const solve1 = (file) => {
    const input = lines(file);
    const forest = parse(input);
    let count = 0;
    for (var x = 1; x < forest.length - 1; x++) {
        for (var y = 1; y < forest[0].length - 1; y++) {
            count += isVisible(treeAt(x, y, forest), forest);
        }
    }
    return perimeter(forest) + count;
};

const solve2 = (file) => {
    const input = lines(file);
    const forest = parse(input);
    let scores = [];
    for (var x = 1; x < forest.length - 1; x++) {
        for (var y = 1; y < forest[0].length - 1; y++) {
            scores.push(scenicScore(treeAt(x, y, forest), forest));
        }
    }
    orderDescending(scores);

    return scores[0];
}

module.exports = { solve1, solve2 };