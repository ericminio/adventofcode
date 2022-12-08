const { lines, orderDescending } = require('../support');

const above = { dx: -1, dy: 0 };
const below = { dx: 1, dy: 0 };
const left = { dx: 0, dy: -1 };
const right = { dx: 0, dy: 1 };
const perimeter = (forest) => 2 * forest.length + 2 * (forest[0].length - 2);
const treeAt = (x, y, forest) => ({ x, y, height: parseInt(forest[x][y]) });
const neighbour = (step, offset, tree, forest) => {
    let x = tree.x + step * offset.dx;
    let y = tree.y + step * offset.dy;
    if (forest[x] !== undefined && forest[x][y]) {
        return treeAt(x, y, forest);
    }
    return undefined;
}
const neighbours = (offset, tree, forest) => {
    let trees = [];
    let step = 1;
    let candidate = neighbour(step, offset, tree, forest);
    while (candidate !== undefined) {
        trees.push(candidate);
        step++;
        candidate = neighbour(step, offset, tree, forest);
    }
    return trees;
};
const isVisibleFrom = (offset, tree, forest) => {
    return !neighbours(offset, tree, forest)
        .map(candidate => tree.height > candidate.height)
        .some(visible => visible === false);
};
const viewingDistance = (offset, tree, forest) => {
    let count = 0;
    let candidates = neighbours(offset, tree, forest);
    for (var i = 0; i < candidates.length; i++) {
        let candidate = candidates[i];
        count += 1;
        if (tree.height <= candidate.height) {
            break;
        }
    }
    return count;
};

const isVisible = (tree, forest) => [above, right, below, left]
    .reduce((visible, direction) => visible || isVisibleFrom(direction, tree, forest), false);

const scenicScore = (tree, forest) => [above, right, below, left]
    .reduce((score, direction) => score * viewingDistance(direction, tree, forest), 1);

const solve1 = (file) => {
    const forest = lines(file);
    let count = 0;
    for (var x = 1; x < forest.length - 1; x++) {
        for (var y = 1; y < forest[0].length - 1; y++) {
            count += isVisible(treeAt(x, y, forest), forest);
        }
    }
    return perimeter(forest) + count;
};

const solve2 = (file) => {
    const forest = lines(file);
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